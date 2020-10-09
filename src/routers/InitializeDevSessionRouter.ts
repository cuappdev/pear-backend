import { Request } from 'express';
import { SerializedUserSession } from '../common/types';
import ApplicationRouter from '../utils/ApplicationRouter';
import LogUtils from '../utils/LogUtils';
import UserRepo from '../repos/UserRepo';
import UserSessionRepo from '../repos/UserSessionRepo';

class InitializeDevSessionRouter extends ApplicationRouter<SerializedUserSession> {
  constructor() {
    super('POST');
  }

  getPath(): string {
    return '/dev/login/';
  }

  async content(req: Request): Promise<SerializedUserSession> {
    if (process.env.NODE_ENV !== 'development') {
      throw LogUtils.logErr('Must be on development environment to acces this endpoint.');
    }

    const user = await UserRepo.createDummyUser('googleId');
    console.log(user);
    const session = await UserSessionRepo.createOrUpdateSession(user, undefined);
    return session.serialize();
  }
}

export default new InitializeDevSessionRouter().router;
