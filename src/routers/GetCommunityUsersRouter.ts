import { Request } from 'express';
import { SerializedCommunityUser } from '../common/types';
import AuthenticatedApplicationRouter from '../utils/AuthenticatedApplicationRouter';
import UserRepo from '../repos/UserRepo';

class GetCommunityUsersRouter extends AuthenticatedApplicationRouter<SerializedCommunityUser[]> {
  constructor() {
    super('GET');
  }

  getPath(): string {
    return '/all/';
  }

  async content(req: Request): Promise<SerializedCommunityUser[]> {
    const users = await UserRepo.getUsers(['groups', 'interests', 'major']);
    const onboardedUsers = users.filter((userObject) => userObject.didOnboard);
    return onboardedUsers.map((userObject) => userObject.communitySerialize());
  }
}

export default new GetCommunityUsersRouter().router;
