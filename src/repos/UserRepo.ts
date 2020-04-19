import { getConnectionManager, Repository } from 'typeorm';
import User from '../entities/User';
import Club from '../entities/Club';
import CornellMajor from '../entities/CornellMajor';
import Interest from '../entities/Interest';

const userDB = (): Repository<User> =>
  getConnectionManager()
    .get()
    .getRepository(User);

const clubDB = (): Repository<Club> =>
  getConnectionManager()
    .get()
    .getRepository(Club);

const cornellMajorDB = (): Repository<CornellMajor> =>
  getConnectionManager()
    .get()
    .getRepository(CornellMajor);

const interestDB = (): Repository<Interest> =>
  getConnectionManager()
    .get()
    .getRepository(Interest);

const createClub = async (
  name: string
): Promise<void> => {
  const possibleClub = await clubDB().findOne({ name });
  if (!possibleClub) {
    const club = clubDB().create({
      name,
      users: []
    });
    await clubDB().save(club);
  }
  return;
}

const createCornellMajor = async (
  name: string
): Promise<void> => {
  const possibleCornellMajor = await cornellMajorDB().findOne({ name });
  if (!possibleCornellMajor) {
    const cornellMajor = cornellMajorDB().create({
      name,
      users: []
    })
    await cornellMajorDB().save(cornellMajor);
  }
  return;
}

const createInterest = async (
  name: string
): Promise<void> => {
  const possibleinterest = await interestDB().findOne({ name });
  if (!possibleinterest) {
    const interest = interestDB().create({
      name,
      users: []
    });
    await interestDB().save(interest);
  }
  return;
}

const createUser = async (
  firstName: string,
  googleID: string,
  lastName: string,
  netID: string
): Promise<User> => {
  if (!(firstName && googleID && lastName && netID)) {
    throw Error('Invalid request body');
  }
  const possibleUser = await userDB().findOne({ netID });
  if (possibleUser) {
    throw Error('User with that netID already exists');
  }
  const user = userDB().create({
    firstName,
    googleID,
    lastName,
    netID,
    matches: [],
  });
  await userDB().save(user);
  return user;
};

const deleteUser = async (netID: string): Promise<boolean> => {
  const user = await getUserByNetID(netID);
  await userDB().delete(user);
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
  await userDB().save(user);
  return true;
};

const getUserByNetID = async (netID: string): Promise<User> => {
  const user = await userDB().findOne({
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
  }
  return user;
};

export default {
  createClub,
  createInterest,
  createCornellMajor,
  createUser,
  deleteUser,
  getUserByNetID,
  updateUser,
};
