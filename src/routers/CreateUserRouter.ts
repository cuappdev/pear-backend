import { Request } from 'express';
import ApplicationRouter from '../appdev/ApplicationRouter';
import UserRepo from '../repos/UserRepo';
import { SerializedUser } from '../common/types';

class CreateUserRouter extends ApplicationRouter<SerializedUser> {
  constructor() {
    super('POST');
  }

  getPath(): string {
    return '/user/';
  }

  async content(req: Request): Promise<SerializedUser> {
    const { firstName, googleID, lastName, netID } = req.body;
    const user = await UserRepo.createUser(netID, googleID, firstName, lastName)
    return user.serialize()
  }
}

export default new CreateUserRouter().router;
