import { getConnectionManager, Repository } from 'typeorm';
import Location from '../entities/Location';

const db = (): Repository<Location> => getConnectionManager().get().getRepository(Location);

const createLocation = async (area: string, name: string): Promise<void> => {
  const possibleLocation = await db().findOne({ area, name });
  if (!possibleLocation) {
    const location = db().create({
      area,
      name,
      user: null,
    });
    await db().save(location);
  }
};

const getLocation = async (area: string, name: string): Promise<Location | undefined> => {
  const location = await db().findOne({ where: { area, name } });
  return location;
};

const getLocations = async (): Promise<Location[]> => {
  return db().find();
};

export default {
  createLocation,
  getLocation,
  getLocations,
};
