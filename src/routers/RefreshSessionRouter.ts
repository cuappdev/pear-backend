import { Request } from 'express';

import ApplicationRouter from '../appdev/ApplicationRouter';
import auth from '../appdev/Authenticate';
import { SerializedUserSession } from '../common/types';

class RefreshSessionRouter extends ApplicationRouter<SerializedUserSession> {
  constructor() {
    super('POST');
  }

  getPath(): string {
    return '/auth/refresh';
  }

  middleware() {
    return [auth.updateSession];
  }

  async content(req: Request): Promise<SerializedUserSession> {
    return req.session;
  }
}

export default new RefreshSessionRouter().router;
