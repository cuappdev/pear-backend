import { Request } from 'express';
import ClubRepo from '../repos/ClubRepo';
import CornellMajorRepo from '../repos/CornellMajorRepo';
import InterestRepo from '../repos/InterestRepo';
import UserRepo from '../repos/UserRepo';
import AuthenticatedAppplicationRouter from '../utils/AuthenticatedApplicationRouter';
import Interest from '../entities/Interest';

class UpdateUserRouter extends AuthenticatedAppplicationRouter<void> {
  constructor() {
    super('POST');
  }

  getPath(): string {
    return '/update/';
  }

  async content(req: Request): Promise<void> {
    const userFields = req.body;
    const userFieldKeys = Object.keys(userFields);
    const userObjectKeys = Object.keys(req.user);
    if (userFieldKeys.length < 1) {
      throw Error('At least one user field is required');
    }
    for (const key of userFieldKeys) {
      if (
        !userObjectKeys.includes(key) ||
        key === 'googleID' ||
        key === 'netID'
      ) {
        throw Error('Invalid user field provided: ' + key);
      }
    }
    if (userFields.clubs) {
      userFields.clubs = await Promise.all(
        userFields.clubs.map(async (name: string) => {
          const club = ClubRepo.getClubByName(name);
          if (!club) throw Error('CornellMajor with that name not found');
          return club;
        })
      );
    }
    if (userFields.interests) {
      userFields.interests = await Promise.all(
        userFields.interests.map(async (name: string) => {
          const interest = InterestRepo.getInterestByName(name);
          if (!interest) throw Error('Interest with that name not found');
          return interest;
        })
      );
    }
    if (userFields.major) {
      const major = await CornellMajorRepo.getCornellMajorByName(
        userFields.major
      );
      if (!major) throw Error('CornellMajor with that name not found');
      userFields.major = major;
    }
    await UserRepo.updateUser(req.user, userFields);
  }
}

export default new UpdateUserRouter().router;
