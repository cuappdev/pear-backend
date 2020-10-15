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
    return '/login/';
  }

  async content(req: Request): Promise<SerializedUserSession> {
    if (process.env.NODE_ENV !== 'development') {
      throw LogUtils.logErr(
        'Must be on development environment to acces this endpoint.'
      );
    }

    try {
      const user = await UserRepo.createDummyUser('googleId');
      const session = await UserSessionRepo.createOrUpdateSession(
        user,
        undefined
      );
      return session.serialize();
    } catch (e) {
      throw Error(e.error.message);
    }
  }
}

export default new InitializeDevSessionRouter().router;
