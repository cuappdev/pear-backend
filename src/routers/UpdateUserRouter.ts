import { Request } from 'express';
import UserRepo from '../repos/UserRepo';
import AuthenticatedAppplicationRouter from '../utils/AuthenticatedApplicationRouter';

class UpdateUserRouter extends AuthenticatedAppplicationRouter<void> {
  constructor() {
    super('POST');
  }

  getPath(): string {
    return '/update/';
  }

  async content(req: Request): Promise<void> {
    const { firstName, lastName, netID } = req.body;
    await UserRepo.updateUser(req.user, firstName, lastName, netID);
  }
}

export default new UpdateUserRouter().router;
