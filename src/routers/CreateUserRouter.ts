import { Request } from 'express';
import { SerializedUser } from '../common/types';
import ApplicationRouter from '../utils/ApplicationRouter';
import Club from '../entities/Club'
import UserRepo from '../repos/UserRepo';
import Interest from '../entities/Interest';
import ClubRepo from '../repos/ClubRepo';
import InterestRepo from '../repos/InterestRepo';
import CornellMajorRepo from '../repos/CornellMajorRepo';

class CreateUserRouter extends ApplicationRouter<SerializedUser> {
  constructor() {
    super('POST');
  }

  getPath(): string {
    return '/user/';
  }

  async content(req: Request): Promise<SerializedUser> {
    const { clubs, firstName, googleID, graduationYear, hometown, interests, lastName, netID, major,
      pronouns } = req.body;
    const clubObjects: Club[] = await Promise.all(clubs.map(async (name: string) => {
      return await ClubRepo.getClubByName(name)
    }));
    const interestObjects: Interest[] = await Promise.all(interests.map(async (name: string) => {
      return await InterestRepo.getInterestByName(name)
    }));
    const majorObject = await CornellMajorRepo.getCornellMajorByName(major);
    const user = await UserRepo.createUser(clubObjects, firstName, googleID, graduationYear, hometown, interestObjects,
      lastName, netID, majorObject, pronouns);
    return user.serialize();
  }
}

export default new CreateUserRouter().router;