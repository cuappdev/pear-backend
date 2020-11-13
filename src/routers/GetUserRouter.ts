import { Request } from 'express';
import { SerializedUser } from '../common/types';
import AuthenticatedApplicationRouter from '../utils/AuthenticatedApplicationRouter';
import UserRepo from '../repos/UserRepo';

class GetUserRouter extends AuthenticatedApplicationRouter<SerializedUser> {
  constructor() {
    super('GET');
  }

  getPath(): string {
    return '/';
  }

  async content(req: Request): Promise<SerializedUser> {
    const { netID } = req.query;
    let user;
    if (netID) {
      user = await UserRepo.getUserByNetID(netID);
      if (!user) throw Error('User with that netID does not exist');
    } else {
      user = req.user;
    }
    return user.serialize();
  }
}

export default new GetUserRouter().router;
