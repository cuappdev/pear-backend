import { getConnectionManager, Repository } from 'typeorm';
import Availability from '../entities/Availability';

const db = (): Repository<Availability> => getConnectionManager().get().getRepository(Availability);

const createAvailability = async (day: string, times: string[]): Promise<Availability> => {
  let possibleAvailability = await db().findOne({ where: { day, times } });
  if (!possibleAvailability) {
    const availability = db().create({
      day,
      times,
      users: [],
    });
    possibleAvailability = await db().save(availability);
  }
  return possibleAvailability;
};

const getAvailability = async (day: string, times: string[]): Promise<Availability> => {
  const availability = await db().findOne({ where: { day, times } });
  if (!availability) {
    return createAvailability(day, times);
  }
  return availability;
};

export default {
  createAvailability,
  getAvailability,
};
