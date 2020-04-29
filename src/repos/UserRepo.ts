import { getConnectionManager, Repository } from 'typeorm';
import Club from '../entities/Club';
import CornellMajor from '../entities/CornellMajor';
import Interest from '../entities/Interest';
import User from '../entities/User';

const db = (): Repository<User> =>
  getConnectionManager()
    .get()
    .getRepository(User);

const createUser = async (
  clubs: Club[],
  firstName: string,
  googleID: string,
  graduationYear: string,
  hometown: string,
  interests: Interest[],
  lastName: string,
  netID: string,
  major: CornellMajor,
  pronouns: string
): Promise<User> => {
  const possibleUser = await db().findOne({ netID });
  if (possibleUser) {
    throw Error('User with given netID already exists');
  }
  const user = db().create({
    clubs,
    firstName,
    googleID,
    graduationYear,
    hometown,
    interests,
    lastName,
    netID,
    major,
    matches: [],
    profilePictureURL: null,
    pronouns,
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
      'interests',
      'major',
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
