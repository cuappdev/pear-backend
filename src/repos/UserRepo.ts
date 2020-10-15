import { getConnectionManager, Repository } from 'typeorm';
import { UserUpdateFields } from '../common/types';
import User from '../entities/User';
import LogUtils from '../utils/LogUtils';

const db = (): Repository<User> =>
  getConnectionManager()
    .get()
    .getRepository(User);

/**
 * Creates a dummy user and saves it to the db (Testing purposes)
 * @function
 * @param {string} id - Google id to create user with
 * @return {User} New dummy user
 */
const createDummyUser = async (id: string): Promise<User> => {
  try {
    const dummyUser = User.dummy(id);
    const user = await getUserByNetID(dummyUser.netID);
    if (!user) return await db().save(User.dummy(id));
    return user;
  } catch (e) {
    throw LogUtils.logErr(e, { id }, 'Problem creating user');
  }
};

const initializeUser = async (
  firstName: string,
  googleID: string,
  lastName: string,
  netID: string
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
  });
  await db().save(user);
  return user;
};

const deleteUser = async (user: User): Promise<boolean> => {
  await db().delete(user);
  return true;
};

const updateUser = async (
  user: User,
  userFields: UserUpdateFields
): Promise<boolean> => {
  db().merge(user, userFields);
  await db().save(user);
  return true;
};

const getUserByNetID = async (netID: string): Promise<User | undefined> => {
  const user = await db().findOne({
    where: { netID },
    relations: [
      'matches',
      'matches.users',
      'matches.schedule',
      'matches.schedule.times',
      'clubs',
      'interests',
      'major',
    ],
  });
  return user;
};

const getUsers = async (): Promise<User[]> => {
  return db().find();
};

export default {
  createDummyUser,
  initializeUser,
  deleteUser,
  updateUser,
  getUserByNetID,
  getUsers,
};
