import { getConnectionManager, Repository } from 'typeorm';
import Interest from '../entities/Interest';
import UserRepo from './UserRepo';

const db = (): Repository<Interest> => getConnectionManager().get().getRepository(Interest);

const createInterest = async (name: string): Promise<void> => {
  const possibleInterest = await db().findOne({ name });
  if (!possibleInterest) {
    const interest = db().create({ name });
    await db().save(interest);
  }
};

const getInterestByName = async (name: string): Promise<Interest | undefined> => {
  const interest = await db().findOne({ where: { name } });
  return interest;
};

const getInterestsByNetID = async (netID: string): Promise<Interest[]> => {
  const user = await UserRepo.getUserByNetID(netID, ['interests']);
  if (!user) throw Error(`User with netID: '${netID}' doesn't exist in the database.`);
  return user.interests;
};

const getInterests = async (): Promise<Interest[]> => {
  return db().find();
};

export default {
  createInterest,
  getInterestByName,
  getInterestsByNetID,
  getInterests,
};
