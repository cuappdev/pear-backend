import { Request } from 'express';
import { SerializedUserSession } from '../common/types';
import ApplicationRouter from '../utils/ApplicationRouter';
import Authenticate from '../utils/Authenticate';

class RefreshSessionRouter extends ApplicationRouter<SerializedUserSession> {
  constructor() {
    super('POST');
  }

  getPath(): string {
    return '/';
  }

  middleware() {
    return [Authenticate.updateSession];
  }

  async content(req: Request): Promise<SerializedUserSession> {
    return req.session;
  }
}

export default new RefreshSessionRouter().router;
