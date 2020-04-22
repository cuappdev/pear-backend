import { getConnectionManager, Repository, getRepository } from 'typeorm';
import { LoginTicket } from 'google-auth-library/build/src/auth/loginticket';
import { SerializedUserSession } from '../common/types';
import AppDevUtils from '../utils/AppDevUtils';
import Club from '../entities/Club';
import CornellMajor from '../entities/CornellMajor';
import Interest from '../entities/Interest';
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
  clubs: Club[],
  graduationYear: string,
  hometown: string,
  interests: Interest[],
  login: LoginTicket,
  major: CornellMajor,
  pronouns: string
): Promise<SerializedUserSession> => {
  const payload = login.getPayload();

  if (!payload) {
    throw Error('Unable to login with Google');
  }

  const googleID = payload.sub;
  const firstName = payload.given_name || '';
  const lastName = payload.family_name || '';

  if (!payload.email) {
    throw Error('No email associated with Google account');
  }
  const netID = AppDevUtils.netIDFromEmail(payload.email);

  let user = await UserRepo.getUserByNetID(netID);

  if (!user) {
    user = await UserRepo.createUser(clubs, firstName, googleID, graduationYear, hometown, interests, lastName, netID,
      major, pronouns);
  }

  const session = await createOrUpdateSession(user, undefined);

  return {
    accessToken: session.accessToken,
    active: session.active,
    refreshToken: session.refreshToken,
    sessionExpiration: session.expiresAt,
  };
};

/**
 * Get user from access token
 * @param {string} accessToken - Access token that we want to find the owner
 * @return {User} User that is associated with the access token
 */
const getUserFromToken = async (accessToken: string): Promise<User> => {
  const session = await db()
    .createQueryBuilder('usersessions')
    .leftJoinAndSelect('usersessions.user', 'user')
    .where('usersessions.accessToken = :accessToken', { accessToken })
    .getOne();
  if (!session) {
    throw Error('No session found with valid token');
  }
  return session.user;
};

const updateSession = async (
  refreshToken: string
): Promise<SerializedUserSession | undefined> => {
  let session = await db()
    .createQueryBuilder('usersessions')
    .leftJoinAndSelect('usersessions.user', 'user')
    .where('usersessions.refreshToken = :refreshToken', { refreshToken })
    .getOne();
  if (!session) {
    return undefined;
  }
  session = session.update();
  await db().save(session);
  return {
    accessToken: session.accessToken,
    active: session.active,
    refreshToken: session.refreshToken,
    sessionExpiration: session.expiresAt,
  };
};

/**
 * Verify a session is still active
 * @param {string} accessToken - Access token to verify
 * @return {boolean} Whether the session with the given token is active or not
 */
const verifySession = async (accessToken: string): Promise<boolean> => {
  const session = await db()
    .createQueryBuilder('usersessions')
    .where('usersessions.accessToken = :accessToken', { accessToken })
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
  updateSession,
  verifySession,
};
