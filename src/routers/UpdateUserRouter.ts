import { Request } from 'express';
import UserRepo from '../repos/UserRepo';
import ApplicationRouter from '../appdev/ApplicationRouter';
import auth from '../appdev/Authenticate';

class UpdateUserRouter extends ApplicationRouter<void> {
  constructor() {
    super('POST');
  }

  getPath(): string {
    return '/user/update/';
  }

  async content(req: Request): Promise<void> {
    const { firstName, lastName, netID } = req.body;
    await UserRepo.updateUser(req.user, firstName, lastName, netID);
  }
}

export default new UpdateUserRouter().router;
