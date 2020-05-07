import { Request } from 'express';
import ClubRepo from '../repos/ClubRepo';
import CornellMajorRepo from '../repos/CornellMajorRepo';
import InterestRepo from '../repos/InterestRepo';
import UserRepo from '../repos/UserRepo';
import AuthenticatedAppplicationRouter from '../utils/AuthenticatedApplicationRouter';

class UpdateUserRouter extends AuthenticatedAppplicationRouter<void> {
  constructor() {
    super('POST');
  }

  getPath(): string {
    return '/update/';
  }

  async content(req: Request): Promise<void> {
    const userFields = req.body;
    for (const field of userFields) {

    }
    if (userFields.clubs) {
      userFields.clubs = await Promise.all(
        userFields.clubs.map(async (name: string) => ClubRepo.getClubByName(name))
      );
    }
    if (userFields.interests) {
      userFields.interests = await Promise.all(
        userFields.interests.map(async (name: string) =>
          InterestRepo.getInterestByName(name)
        )
      );
    }
    if (userFields.major) {
      userFields.major = await CornellMajorRepo.getCornellMajorByName(userFields.major);
    }
    await UserRepo.updateUser(req.user, userFields);
  }
}

export default new UpdateUserRouter().router;
