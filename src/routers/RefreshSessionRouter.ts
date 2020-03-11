import { Request } from 'express';

import ApplicationRouter from '../appdev/ApplicationRouter';

import UserSessionRepo from '../repos/UserSessionRepo';
import { SerializedUserSession } from '../common/types';

class RefreshSessionRouter extends ApplicationRouter<SerializedUserSession> {
  constructor() {
    super('POST');
  }

  getPath(): string {
    return '/auth/refresh';
  }

  async content(req: Request): Promise<SerializedUserSession> {
    const { accessToken } = req.body;
    const user = await UserSessionRepo.getUserFromToken(accessToken);
    if (!user) throw Error('Unable to find user with given token');
    const session = await UserSessionRepo.createOrUpdateSession(
      user,
      accessToken
    );
    return session.serialize();
  }
}

export default new RefreshSessionRouter().router;
