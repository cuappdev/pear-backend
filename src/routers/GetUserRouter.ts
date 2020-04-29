import { Request } from 'express';
import { SerializedUser } from '../common/types';
import AuthenticatedAppplicationRouter from '../utils/AuthenticatedApplicationRouter';
import UserRepo from '../repos/UserRepo';

class GetUserRouter extends AuthenticatedAppplicationRouter<SerializedUser> {
  constructor() {
    super('GET');
  }

  getPath(): string {
    return '/';
  }

  async content(req: Request): Promise<SerializedUser> {
    const { netID } = req.query;
    const user = await UserRepo.getUserByNetID(netID);
    return user.serialize();
  }
}

export default new GetUserRouter().router;
