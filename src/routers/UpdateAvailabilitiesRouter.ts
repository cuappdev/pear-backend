import { Request } from 'express';
import Constants from '../common/constants';
import Availability from '../entities/Availability';
import AvailabilityRepo from '../repos/AvailabilityRepo';
import UserRepo from '../repos/UserRepo';
import AuthenticatedApplicationRouter from '../utils/AuthenticatedApplicationRouter';

class UpdateAvailabilitiesRouter extends AuthenticatedApplicationRouter<void> {
  constructor() {
    super('POST');
  }

  getPath(): string {
    return '/availabilities/';
  }

  async content(req: Request): Promise<void> {
    const { user, body } = req;
    const { schedule } = body;

    if (!schedule) {
      throw Error('Missing schedule list');
    }

    schedule.forEach((availability) => {
      const { day, times } = availability;

      if (day) {
        if (!Constants.VALID_DAYS.includes(day)) {
          throw Error(`Invalid day '${day}' identified in schedule list.`);
        }
      } else {
        throw Error('Missing day field in schedule list entry.');
      }

      if (times) {
        availability.times = [...new Set(times)]; // remove duplicates then sort
        availability.times.sort();
        times.forEach((time) => {
          if (!Constants.VALID_TIMES.includes(time)) {
            throw Error(`Invalid time '${time}' identified under '${day}'.`);
          }
        });
      } else {
        throw Error(`Missing times field in schedule list entry under '${day}'.`);
      }
    });

    const availabilities = await schedule.reduce(
      async (availabilitiesList: Promise<Availability[]>, availability) => {
        const collection = await availabilitiesList;
        const { day, times } = availability;

        const availabilityEntity: Availability = await AvailabilityRepo.getAvailability(day, times);
        collection.push(availabilityEntity);
        return collection;
      },
      Promise.resolve([]),
    );

    await UserRepo.updateUser(user, { availabilities });
  }
}

export default new UpdateAvailabilitiesRouter().router;
