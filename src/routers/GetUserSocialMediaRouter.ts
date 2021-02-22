import { Request } from 'express';
import { UserSocialMedia } from '../common/types';
import AuthenticatedApplicationRouter from '../utils/AuthenticatedApplicationRouter';
import UserRepo from '../repos/UserRepo';

class GetUserSocialMediaRouter extends AuthenticatedApplicationRouter<UserSocialMedia> {
  constructor() {
    super('GET');
  }

  getPath(): string {
    return '/socialMedia';
  }

  async content(req: Request): Promise<UserSocialMedia> {
    const { netID } = req.query;
    const user = await UserRepo.getUserByNetID(netID || req.user.netID);
    if (!user) throw Error(`User with netID: '${netID}' doesn't exist in the database.`);
    return {
      facebook: user.facebook,
      instagram: user.instagram,
    };
  }
}

export default new GetUserSocialMediaRouter().router;
