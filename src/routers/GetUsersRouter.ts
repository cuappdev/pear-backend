import { Request } from 'express';
import { SerializedUser } from '../common/types';
import AuthenticatedAppplicationRouter from '../utils/AuthenticatedApplicationRouter';
import UserRepo from '../repos/UserRepo';

class GetUsersRouter extends AuthenticatedAppplicationRouter<SerializedUser[]> {
  constructor() {
    super('GET');
  }

  getPath(): string {
    return '/all/';
  }

  async content(req: Request): Promise<SerializedUser[]> {
    const users = await UserRepo.getUsers();
    return users.map(userObject => userObject.serialize());
  }
}

export default new GetUsersRouter().router;