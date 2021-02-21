import { getConnectionManager, Repository } from 'typeorm';
import CornellMajor from '../entities/CornellMajor';
import UserRepo from './UserRepo';

const db = (): Repository<CornellMajor> => getConnectionManager().get().getRepository(CornellMajor);

const createCornellMajor = async (name: string): Promise<void> => {
  const possibleCornellMajor = await db().findOne({ name });
  if (!possibleCornellMajor) {
    const cornellMajor = db().create({ name });
    await db().save(cornellMajor);
  }
};

const getCornellMajorByName = async (name: string): Promise<CornellMajor | undefined> => {
  const major = await db().findOne({ where: { name } });
  return major;
};

const getCornellMajorByNetID = async (netID: string): Promise<CornellMajor> => {
  const user = await UserRepo.getUserByNetID(netID, ['major']);
  if (!user) throw Error(`User with netID: '${netID}' doesn't exist in the database.`);
  return user.major;
};

const getCornellMajors = async (): Promise<CornellMajor[]> => {
  return db().find();
};

export default {
  createCornellMajor,
  getCornellMajorByName,
  getCornellMajorByNetID,
  getCornellMajors,
};
