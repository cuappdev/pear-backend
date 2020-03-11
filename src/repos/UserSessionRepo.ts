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

/**
 * Create or update session for a user
 * @param {User} user - User to either create or update a session for
 * @param {string | undefined} accessToken - Access token to be used for the session
 * @return {UserSession} New or updated session
 */
const createOrUpdateSession = async (
  user: User,
  accessToken?: string
): Promise<UserSession> => {
  let session = await db()
    .createQueryBuilder('usersessions')
    .innerJoin('usersessions.user', 'user', 'user.uuid = :userID')
    .setParameters({ userID: user.id })
    .getOne();
  if (session) {
    session.update(accessToken);
    session.user = user;
  } else {
    session = UserSession.fromUser(user, accessToken);
  }

  return db().save(session);
};

/**
 * Creates a user if one doesn't exist and then initializes a session for them
 * @param {LoginTicket} login - Login object provided by Google
 * @return {SerializedUserSession} Contains session information for user
 */
const createUserAndInitializeSession = async (
  login: LoginTicket
): Promise<SerializedUserSession> => {
  const payload = login.getPayload();

  if (!payload) {
    throw Error('Unable to login with Google');
  }

  const googleID = payload.sub;
  const first = payload.given_name ? payload.given_name : '';
  const last = payload.family_name ? payload.family_name : '';

  if (!payload.email) {
    throw Error('No email associated with Google account');
  }
  const netID = AppDevUtils.netIDFromEmail(payload.email);

  let user = await UserRepo.getUserByNetID(netID);

  if (!user) {
    user = await UserRepo.createUser(netID, googleID, first, last);
  }

  const session = await createOrUpdateSession(user, undefined);

  return {
    accessToken: session.sessionToken,
    active: session.active,
    sessionExpiration: session.expiresAt,
  };
};

/**
 * Get user from access token
 * @param {string} accessToken - Access token that we want to find the owner
 * @return {User | undefined} User that is associated with the access token
 */
const getUserFromToken = async (
  accessToken: string
): Promise<User | undefined> => {
  const session = await db()
    .createQueryBuilder('usersessions')
    .leftJoinAndSelect('usersessions.user', 'user')
    .where('usersessions.sessionToken = :accessToken', { accessToken })
    .getOne();
  return session?.user;
};

/**
 * Verify a session is still active
 * @param {string} accessToken - Access token to verify
 * @return {boolean} Whether the session with the given token is active or not
 */
const verifySession = async (accessToken: string): Promise<boolean> => {
  const session = await db()
    .createQueryBuilder('usersessions')
    .where('usersessions.sessionToken = :accessToken', { accessToken })
    .getOne();
  return session
    ? session.active &&
        session.expiresAt > String(Math.floor(new Date().getTime() / 1000))
    : false;
};

export default {
  createOrUpdateSession,
  createUserAndInitializeSession,
  getUserFromToken,
  verifySession,
};
