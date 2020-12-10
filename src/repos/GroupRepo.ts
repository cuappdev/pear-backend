import { getConnectionManager, Repository } from 'typeorm';
import Group from '../entities/Group';

const db = (): Repository<Group> => getConnectionManager().get().getRepository(Group);

const createGroup = async (name: string): Promise<void> => {
  const possibleGroup = await db().findOne({ name });
  if (!possibleGroup) {
    const group = db().create({ name });
    await db().save(group);
  }
};

const getGroupByName = async (name: string): Promise<Group | undefined> => {
  const group = await db().findOne({ where: { name } });
  return group;
};

const getGroups = async (): Promise<Group[]> => {
  return db().find();
};

export default {
  createGroup,
  getGroupByName,
  getGroups,
};
