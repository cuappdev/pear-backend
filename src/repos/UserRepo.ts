import { getConnectionManager, Repository } from 'typeorm';
import User from '../entities/User';
import UserSessionRepo from './UserSessionRepo';

const db = (): Repository<User> =>
  getConnectionManager()
    .get()
    .getRepository(User);

const createUser = async (
  firstName: string,
  googleID: string,
  lastName: string,
  netID: string
): Promise<User> => {
  const possibleUser = await db().findOne({ netID });
  if (possibleUser) {
    throw Error('User with that netID already exists');
  }
  const user = db().create({
    firstName,
    googleID,
    lastName,
    netID,
    matches: [],
  });
  await db().save(user);
  return user;
};

const deleteUser = async (accessToken: string): Promise<boolean> => {
  if (await UserSessionRepo.verifySession(accessToken)) {
    const user = await UserSessionRepo.getUserFromToken(accessToken);
    if (user) {
      await db().delete(user);
      return true;
    } else throw Error('Could not find user with given access token');
  } else throw Error('Could not verify session');
};

const updateUser = async (
  accessToken: string,
  firstName: string,
  lastName: string,
  netID: string
): Promise<boolean> => {
  if (await UserSessionRepo.verifySession(accessToken)) {
    const user = await UserSessionRepo.getUserFromToken(accessToken);
    if (user) {
      user.firstName = firstName ? firstName : user.firstName;
      user.lastName = lastName ? lastName : user.lastName;
      user.netID = netID ? netID : user.netID;
      await db().save(user);
      return true;
    } else throw Error('Could not find user with given access token');
  } else throw Error('Could not verify session');
};

const findUser = async (accessToken: string, netID: string): Promise<User> => {
  if (await UserSessionRepo.verifySession(accessToken)) {
    const user = await getUserByNetID(netID);
    if (user) return user;
    else throw Error('User with given netID not found');
  } else throw Error('Could not verify session');
};

const getUserByNetID = async (netID: string): Promise<User | undefined> => {
  const user = await db().findOne({
    where: { netID },
    relations: [
      'matches',
      'matches.users',
      'matches.schedule',
      'matches.schedule.times',
    ],
  });
  return user;
};

export default {
  createUser,
  deleteUser,
  findUser,
  getUserByNetID,
  updateUser,
};
