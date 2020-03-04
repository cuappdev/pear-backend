import { Request } from 'express';
import { SerializedMatching } from '../common/types';
import ApplicationRouter from '../appdev/ApplicationRouter';
import MatchingRepo from '../repos/MatchingRepo';
import UserRepo from '../repos/UserRepo';

class CreateMatchingRouter extends ApplicationRouter<SerializedMatching> {
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
      const daySchedule = await MatchingRepo.createDaySchedule(
        ds.day,
        ds.times
      );
      daySchedules.push(daySchedule);
    }
    const users = [];
    for (const netID of netIDs) {
      const user = await UserRepo.getUserByNetID(netID);
      users.push(user);
    }
    const matching = await MatchingRepo.createMatching(users, daySchedules);
    return matching.serialize();
  }
}

export default new CreateMatchingRouter().router;
