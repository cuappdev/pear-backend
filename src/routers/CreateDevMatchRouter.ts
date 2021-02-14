import { Request } from 'express';
import ApplicationRouter from '../utils/ApplicationRouter';
import Constants from '../common/constants';
import LogUtils from '../utils/LogUtils';
import UserRepo from '../repos/UserRepo';
import User from '../entities/User';
import MatchRepo from '../repos/MatchRepo';

class CreateDevMatchRouter extends ApplicationRouter<void> {
  constructor() {
    super('POST');
  }

  getPath(): string {
    return '/match/';
  }

  async content(req: Request): Promise<void> {
    if (!Constants.IS_DEVELOPMENT) {
      throw LogUtils.logErr('Must be on development environment to access this endpoint.');
    }

    const { netIDs } = req.body;
    const users = await netIDs.reduce(async (filteredNetIDs: Promise<User[]>, netID: string) => {
      const collection = await filteredNetIDs;
      const user = await UserRepo.getUserByNetID(netID);

      if (user) collection.push(user);
      else {
        LogUtils.logErr(`User with netID: '${netID}' doesn't exist in the database.`);
      }

      return collection;
    }, Promise.resolve([]));

    const matchCreated = await MatchRepo.createMatch(users);
    if (!matchCreated) {
      throw Error('Must provide at least 2 valid users to create a match.');
    }
  }
}

export default new CreateDevMatchRouter().router;
