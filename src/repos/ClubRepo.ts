import { getConnectionManager, Repository } from 'typeorm';
import Club from '../entities/Club';

const db = (): Repository<Club> =>
  getConnectionManager()
    .get()
    .getRepository(Club);

const createClub = async (name: string): Promise<void> => {
  const possibleClub = await db().findOne({ name });
  if (!possibleClub) {
    const club = db().create({
      name,
      users: [],
    });
    await db().save(club);
  }
  return;
};

const getClubByName = async (name: string): Promise<Club> => {
  const club = await db().findOne({ where: { name } });
  if (!club) {
    throw Error('Club with that name not found');
  }
  return club;
};

const getClubs = async (): Promise<Club[]> => {
  return db().find();
};

export default {
  createClub,
  getClubByName,
  getClubs,
};
