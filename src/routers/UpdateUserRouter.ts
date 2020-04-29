import { Request } from 'express';
import ApplicationRouter from '../utils/ApplicationRouter';
import Authenticate from '../utils/Authenticate';
import UserRepo from '../repos/UserRepo';

class UpdateUserRouter extends ApplicationRouter<void> {
  constructor() {
    super('POST');
  }

  getPath(): string {
    return '/update/';
  }
 
  middleware() {
    return [Authenticate.ensureAuthenticated];
  }

  async content(req: Request): Promise<void> {
    const { firstName, lastName, netID } = req.body;
    await UserRepo.updateUser(req.user, firstName, lastName, netID);
  }
}

export default new UpdateUserRouter().router;
