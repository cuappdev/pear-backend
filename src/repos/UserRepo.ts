import { getConnectionManager, Repository } from 'typeorm';
import { UserUpdateFields } from '../common/types';
import User from '../entities/User';
import LogUtils from '../utils/LogUtils';

const db = (): Repository<User> => getConnectionManager().get().getRepository(User);

/**
 * Creates a dummy user and saves it to the db (Testing purposes)
 * @function
 * @param {string} firstName - first name used to create new user
 * @param {string} googleID - google ID used to create new user
 * @param {string} lastName - last name used to create new user
 * @param {string} netID - netID used to create new user
 * @return {User} a new user with given args or default Chuck Norris (cnorris) with id googleId
 */
const createDummyUser = async (
  firstName = 'Chuck',
  googleID = 'googleID',
  lastName = 'Norris',
  netID = 'cnorris',
): Promise<User> => {
  try {
    const dummyUser = User.dummy(firstName, googleID, lastName, netID);
    const user = await getUserByNetID(netID);
    if (!user) return await db().save(dummyUser);
    return user;
  } catch (e) {
    throw LogUtils.logErr(e, { firstName, googleID, lastName, netID }, 'Problem creating user');
  }
};

const initializeUser = async (
  firstName: string,
  googleID: string,
  lastName: string,
  netID: string,
): Promise<User> => {
  const possibleUser = await db().findOne({ netID });
  if (possibleUser) {
    throw Error('User with given netID already exists');
  }
  const user = db().create({
    googleID,
    firstName,
    lastName,
    netID,
    didOnboard: false,
  });
  await db().save(user);
  return user;
};

const deleteUser = async (user: User): Promise<boolean> => {
  await db().delete(user);
  return true;
};

const updateUser = async (user: User, userFields: UserUpdateFields): Promise<boolean> => {
  db().merge(user, userFields);
  await db().save(user);
  return true;
};

const getUserByNetID = async (
  netID: string,
  relations: string[] = [],
): Promise<User | undefined> => {
  const user = await db().findOne({
    where: { netID },
    relations,
  });
  return user;
};

const getUsers = async (relations: string[] = []): Promise<User[]> => {
  return db().find({
    relations,
  });
};

const getUserNetIDS = async (): Promise<string[]> => {
  const users = await db().find();
  return users.map((user) => user.netID);
};

export default {
  createDummyUser,
  initializeUser,
  deleteUser,
  updateUser,
  getUserByNetID,
  getUsers,
  getUserNetIDS,
};
