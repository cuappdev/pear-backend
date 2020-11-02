import { getConnectionManager, Repository } from 'typeorm';
import Availability from '../entities/Availability';

const db = (): Repository<Availability> => getConnectionManager().get().getRepository(Availability);

const createAvailability = async (day: string, times: number[]): Promise<void> => {
  const possibleAvailability = await db().findOne({ day, times });
  if (!possibleAvailability) {
    const club = db().create({
      day,
      times,
      users: [],
    });
    await db().save(club);
  }
};

export default {
  createAvailability,
};
