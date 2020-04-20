import { Request } from 'express';
import { SerializedUserSession } from '../common/types';
import auth from '../utils/Authenticate';
import ApplicationRouter from '../utils/ApplicationRouter';

class RefreshSessionRouter extends ApplicationRouter<SerializedUserSession> {
  constructor() {
    super('POST');
  }

  getPath(): string {
    return '/auth/refresh/';
  }

  middleware() {
    return [auth.updateSession];
  }

  async content(req: Request): Promise<SerializedUserSession> {
    return req.session;
  }
}

export default new RefreshSessionRouter().router;
