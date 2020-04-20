import { getConnectionManager, Repository } from 'typeorm';
import User from '../entities/User';


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
    throw Error('User with given netID already exists');
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

const deleteUser = async (user: User): Promise<boolean> => {
  await db().delete(user);
  return true;
};

const updateUser = async (
  user: User,
  firstName: string,
  lastName: string,
  netID: string
): Promise<boolean> => {
  user.firstName = firstName ? firstName : user.firstName;
  user.lastName = lastName ? lastName : user.lastName;
  user.netID = netID ? netID : user.netID;
  await db().save(user);
  return true;
};

const getUserByNetID = async (netID: string): Promise<User> => {
  const user = await db().findOne({
    where: { netID },
    relations: [
      'matches',
      'matches.users',
      'matches.schedule',
      'matches.schedule.times',
      'clubs',
      'clubs.name'
    ],
  });
  if (!user) {
    throw Error('User with given netID not found');
  }
  return user;
};

export default {
  createUser,
  deleteUser,
  getUserByNetID,
  updateUser,
};
