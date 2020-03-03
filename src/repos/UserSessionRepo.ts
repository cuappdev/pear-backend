import { getConnectionManager, Repository, getRepository } from 'typeorm';
import { LoginTicket } from 'google-auth-library/build/src/auth/loginticket';
import { SerializedUserSession } from '../common/types';

import AppDevUtils from '../appdev/AppDevUtils';
import UserRepo from './UserRepo';
import User from '../entities/User';
import UserSession from '../entities/UserSession';

const db = (): Repository<UserSession> =>
  getConnectionManager()
    .get()
    .getRepository(UserSession);

const createOrUpdateSession = async (
  user: User,
  accessToken?: string,
  refreshToken?: string
): Promise<UserSession> => {
  let session = await db()
    .createQueryBuilder('usersessions')
    .innerJoin('usersessions.user', 'user', 'user.uuid = :userID')
    .setParameters({ userID: user.id })
    .getOne();
  if (session) {
    session.update(accessToken, refreshToken);
    session.user = user;
  } else {
    session = UserSession.fromUser(user, accessToken, refreshToken);
  }

  return db().save(session);
};

const createUserAndInitializeSession = async (
  login: LoginTicket
): Promise<SerializedUserSession> => {
  const payload = login.getPayload();
  const googleID = payload.sub;
  const first = payload.given_name;
  const last = payload.family_name;
  const netID = AppDevUtils.netIDFromEmail(payload.email);

  let user = await UserRepo.getUserByNetID(netID);

  if (!user) {
    user = await UserRepo.createUser(netID, googleID, first, last);
  }

  const session = await createOrUpdateSession(user, null, null);

  return {
    accessToken: session.sessionToken,
    refreshToken: session.updateToken,
    sessionExpiration: session.expiresAt,
    isActive: session.isActive,
  };
};

export default {
  createOrUpdateSession,
  createUserAndInitializeSession,
};
