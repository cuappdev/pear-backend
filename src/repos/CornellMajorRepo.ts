import { getConnectionManager, Repository } from 'typeorm';
import CornellMajor from '../entities/CornellMajor';

const db = (): Repository<CornellMajor> =>
  getConnectionManager()
    .get()
    .getRepository(CornellMajor);

const createCornellMajor = async (name: string): Promise<void> => {
  const possibleCornellMajor = await db().findOne({ name });
  if (!possibleCornellMajor) {
    const cornellMajor = db().create({
      name,
      users: [],
    });
    await db().save(cornellMajor);
  }
  return;
};

const getCornellMajorByName = async (name: string): Promise<CornellMajor> => {
  const major = await db().findOne({ where: { name } });
  if (!major) {
    throw Error('CornellMajor with that name not found');
  }
  return major;
};

const getCornellMajors = async (): Promise<CornellMajor[]> => {
  return db().find();
};

export default {
  createCornellMajor,
  getCornellMajorByName,
  getCornellMajors,
};
