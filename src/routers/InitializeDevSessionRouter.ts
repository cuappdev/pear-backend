import { Request } from 'express';
import { SerializedUserSession } from '../common/types';
import ApplicationRouter from '../utils/ApplicationRouter';
import Constants from '../common/constants';
import LogUtils from '../utils/LogUtils';
import UserRepo from '../repos/UserRepo';
import UserSessionRepo from '../repos/UserSessionRepo';

class InitializeDevSessionRouter extends ApplicationRouter<SerializedUserSession> {
  constructor() {
    super('POST');
  }

  getPath(): string {
    return '/login/';
  }

  async content(req: Request): Promise<SerializedUserSession> {
    if (!Constants.IS_DEVELOPMENT) {
      throw LogUtils.logErr('Must be on development environment to access this endpoint.');
    }

    try {
      const { firstName, googleID, lastName, netID } = req.body;
      const user = await UserRepo.createDummyUser(firstName, googleID, lastName, netID);
      const session = await UserSessionRepo.createOrUpdateSession(user, undefined);
      return session.serialize();
    } catch (e) {
      throw Error(e.error.message);
    }
  }
}

export default new InitializeDevSessionRouter().router;
