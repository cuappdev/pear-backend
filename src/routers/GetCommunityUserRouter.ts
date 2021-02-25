import { Request } from 'express';
import { SerializedCommunityUser } from '../common/types';
import AuthenticatedApplicationRouter from '../utils/AuthenticatedApplicationRouter';
import UserRepo from '../repos/UserRepo';

class GetCommunityUserRouter extends AuthenticatedApplicationRouter<SerializedCommunityUser> {
  constructor() {
    super('GET');
  }

  getPath(): string {
    return '/';
  }

  async content(req: Request): Promise<SerializedCommunityUser> {
    const { netID } = req.query;
    const user = await UserRepo.getUserByNetID(netID || req.user.netID, [
      'groups',
      'interests',
      'major',
    ]);
    return user.communitySerialize();
  }
}

export default new GetCommunityUserRouter().router;
