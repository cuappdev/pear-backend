import ApplicationRouter from '../appdev/ApplicationRouter';
import { Request } from 'express';
import { SerializedUser } from '../common/types';
import UserRepo from '../repos/UserRepo';

class CreateUserRouter extends ApplicationRouter<SerializedUser> {
  constructor() {
    super('POST');
  }

  getPath(): string {
    return '/user/';
  }

  async content(req: Request): Promise<SerializedUser> {
    const { firstName, googleID, lastName, netID } = req.body;
    const user = await UserRepo.createUser(netID, googleID, firstName, lastName);
    return user.serialize();
  }
}

export default new CreateUserRouter().router;