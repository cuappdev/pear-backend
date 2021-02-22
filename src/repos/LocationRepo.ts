import { getConnectionManager, Repository } from 'typeorm';
import Location from '../entities/Location';
import UserRepo from './UserRepo';

const db = (): Repository<Location> => getConnectionManager().get().getRepository(Location);

const createLocation = async (area: string, name: string): Promise<void> => {
  const possibleLocation = await db().findOne({ area, name });
  if (!possibleLocation) {
    const location = db().create({
      area,
      name,
    });
    await db().save(location);
  }
};

const getLocation = async (area: string, name: string): Promise<Location | undefined> => {
  const location = await db().findOne({ where: { area, name } });
  return location;
};

const getLocationsByNetID = async (netID: string): Promise<Location[]> => {
  const user = await UserRepo.getUserByNetID(netID, ['preferredLocations']);
  if (!user) throw Error(`User with netID: '${netID}' doesn't exist in the database.`);
  return user.preferredLocations;
};

const getLocations = async (): Promise<Location[]> => {
  return db().find();
};

export default {
  createLocation,
  getLocation,
  getLocationsByNetID,
  getLocations,
};
