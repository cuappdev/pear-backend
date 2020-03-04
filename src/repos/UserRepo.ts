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
  if (!(firstName && googleID && lastName && netID)) {
    throw Error('Invalid request body');
  }
  const possibleUser = await db().findOne({ netID });
  if (possibleUser) {
    throw Error('User with that netID already exists');
  }
  const user = db().create({
    firstName,
    googleID,
    lastName,
    netID,
  });
  await db().save(user);
  return user;
};

const deleteUser = async (netID: string): Promise<boolean> => {
  const user = await getUserByNetID(netID);
  await db().delete(user);
  return true;
};

const updateUser = async (
  currentNetID: string,
  firstName: string,
  lastName: string,
  netID: string
): Promise<boolean> => {
  const user = await getUserByNetID(currentNetID);
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
    ],
  });
  if (!user) {
    throw Error('User with that netID does not exist');
  } else {
    return user;
  }
};

export default {
  createUser,
  deleteUser,
  getUserByNetID,
  updateUser,
};
