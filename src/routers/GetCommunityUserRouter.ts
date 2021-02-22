import { Request } from 'express';
import { SerializedUser } from '../common/types';
import AuthenticatedApplicationRouter from '../utils/AuthenticatedApplicationRouter';
import UserRepo from '../repos/UserRepo';

class GetCommunityUserRouter extends AuthenticatedApplicationRouter<SerializedUser> {
  constructor() {
    super('GET');
  }

  getPath(): string {
    return '/';
  }

  async content(req: Request): Promise<SerializedUser> {
    const { netID } = req.query;
    const user = await UserRepo.getUserByNetID(netID || req.user.netID, [
      'groups',
      'interests',
      'major',
      /** Below are properties to remove once iOS refactors */
      'availabilities',
      'goals',
      'matches',
      'matches.availabilities',
      'matches.users',
      'preferredLocations',
      'talkingPoints',
    ]);
    return user.serialize();
  }
}

export default new GetCommunityUserRouter().router;
