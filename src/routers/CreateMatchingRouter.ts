import { Request } from 'express';
import { SerializedMatching } from '../common/types';
import AuthenticatedAppplicationRouter from '../utils/AuthenticatedApplicationRouter';
import Constants from '../common/constants';
import MatchingRepo from '../repos/MatchingRepo';
import UserRepo from '../repos/UserRepo';

class CreateMatchingRouter extends AuthenticatedAppplicationRouter<
  SerializedMatching
> {
  constructor() {
    super('POST');
  }

  getPath(): string {
    return '/matching/';
  }

  async content(req: Request): Promise<SerializedMatching> {
    const { netIDs, schedule } = req.body;
    const daySchedules = [];
    for (const ds of schedule) {
      if (!Constants.VALID_DAYS.includes(ds.day)) {
        throw Error(
          'Invalid day ' + ds.day + ' is not in [' + Constants.VALID_DAYS + ']'
        );
      }
      for (const time of ds.times) {
        if (!Constants.VALID_TIMES.includes(time)) {
          throw Error(
            'Invalid time ' +
              time +
              ' is not in [' +
              Constants.VALID_TIMES +
              ']'
          );
        }
      }
      const daySchedule = await MatchingRepo.createDaySchedule(
        ds.day,
        ds.times
      );
      daySchedules.push(daySchedule);
    }
    const users = [];
    for (const netID of netIDs) {
      const user = await UserRepo.getUserByNetID(netID);
      if (!user) throw Error('User with that netID does not exist');
      users.push(user);
    }
    const matching = await MatchingRepo.createMatching(users, daySchedules);
    return matching.serialize();
  }
}

export default new CreateMatchingRouter().router;
