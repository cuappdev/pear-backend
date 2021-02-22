import { Request } from 'express';
import { UserDemographics } from '../common/types';
import AuthenticatedApplicationRouter from '../utils/AuthenticatedApplicationRouter';
import UserRepo from '../repos/UserRepo';

class GetUserDemographicsRouter extends AuthenticatedApplicationRouter<UserDemographics> {
  constructor() {
    super('GET');
  }

  getPath(): string {
    return '/demographics';
  }

  async content(req: Request): Promise<UserDemographics> {
    const { netID } = req.query;
    const user = await UserRepo.getUserByNetID(netID || req.user.netID, ['major']);
    if (!user) throw Error(`User with netID: '${netID}' doesn't exist in the database.`);
    return {
      googleID: user.googleID,
      firstName: user.firstName,
      lastName: user.lastName,
      pronouns: user.pronouns,
      graduationYear: user.graduationYear,
      major: user.major.serialize(),
      hometown: user.hometown,
      profilePictureURL: user.profilePictureURL,
    };
  }
}

export default new GetUserDemographicsRouter().router;
