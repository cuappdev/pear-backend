import { getConnectionManager, Repository } from 'typeorm';
import { UserUpdateFields } from '../common/types';
import User from '../entities/User';

const db = (): Repository<User> =>
  getConnectionManager()
    .get()
    .getRepository(User);

const initalizeUser = async (
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
    clubs: [],
    firstName,
    googleID,
    graduationYear: null,
    hometown: null,
    interests: [],
    lastName,
    netID,
    major: null,
    matches: [],
    profilePictureURL: null,
    pronouns: null,
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

export default {
  initalizeUser,
  deleteUser,
  getUserByNetID,
  updateUser,
};
