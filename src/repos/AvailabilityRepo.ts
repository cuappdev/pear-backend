import { getConnectionManager, Repository } from 'typeorm';
import Availability from '../entities/Availability';
import UserRepo from './UserRepo';

const db = (): Repository<Availability> => getConnectionManager().get().getRepository(Availability);

const createAvailability = async (day: string, times: number[]): Promise<Availability> => {
  let possibleAvailability = await db().findOne({ where: { day, times } });
  if (!possibleAvailability) {
    const availability = db().create({
      day,
      times,
    });
    possibleAvailability = await db().save(availability);
  }
  return possibleAvailability;
};

const getAvailability = async (day: string, times: number[]): Promise<Availability> => {
  const availability = await db().findOne({ where: { day, times } });
  if (!availability) {
    return createAvailability(day, times);
  }
  return availability;
};

const getAvailabilitiesByNetID = async (netID: string): Promise<Availability[]> => {
  const user = await UserRepo.getUserByNetID(netID, ['availabilities']);
  if (!user) throw Error(`User with netID: '${netID}' doesn't exist in the database.`);
  return user.availabilities;
};

export default {
  createAvailability,
  getAvailability,
  getAvailabilitiesByNetID,
};
