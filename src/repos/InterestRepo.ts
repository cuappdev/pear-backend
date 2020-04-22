import { getConnectionManager, Repository } from 'typeorm';
import Interest from '../entities/Interest';


const db = (): Repository<Interest> =>
  getConnectionManager()
    .get()
    .getRepository(Interest);

const createInterest = async (
  name: string
): Promise<void> => {
  const possibleInterest = await db().findOne({ name });
  if (!possibleInterest) {
    const interest = db().create({
      name,
      users: []
    });
    await db().save(interest);
  }
  return;
}

const getInterestByName = async (
  name: string
): Promise<Interest> => {
  const interest = await db().findOne({ where: { name } });
  if (!interest) {
    throw Error('Interest with that name not found');
  }
  return interest;
}

const getInterests = async (
): Promise<Interest[]> => {
  return db().find();
}

export default {
  createInterest,
  getInterestByName,
  getInterests
};
