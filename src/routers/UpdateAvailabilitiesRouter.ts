import { Request } from 'express';
import Constants from '../common/constants';
import UserRepo from '../repos/UserRepo';
import AuthenticatedAppplicationRouter from '../utils/AuthenticatedApplicationRouter';

class UpdateAvailabilitiesRouter extends AuthenticatedAppplicationRouter<void> {
  constructor() {
    super('POST');
  }

  getPath(): string {
    return '/availabilities/';
  }

  async content(req: Request): Promise<void> {
    const { user, body } = req;

    const validFields = ['schedule'];

    Object.keys(body).forEach((key) => {
      if (!validFields.includes(key)) {
        throw Error(`Invalid field '${key}' identified in request body.`);
      }
    });

    const { schedule } = body;
    schedule.forEach((availability) => {
      const validScheduleFields = ['day', 'times'];

      Object.keys(availability).forEach((key) => {
        if (!validScheduleFields.includes(key)) {
          throw Error(`Invalid field '${key}' identified in schedule list.`);
        }
      });

      const { day, times } = availability;

      if (day) {
        if (!Constants.VALID_DAYS.includes(day)) {
          throw Error(`Invalid day '${day}' identified in schedule list.`);
        }
      } else {
        throw Error('Missing day field in schedule list entry.');
      }

      if (times) {
        times.forEach((time) => {
          if (!Constants.VALID_TIMES.includes(time)) {
            throw Error(`Invalid time '${time}' identified under '${day}'.`);
          }
        });
      } else {
        throw Error(`Missing times field in schedule list entry under '${day}'.`);
      }
    });

    await UserRepo.updateUser(user, { availabilities: schedule });
  }
}

export default new UpdateAvailabilitiesRouter().router;
