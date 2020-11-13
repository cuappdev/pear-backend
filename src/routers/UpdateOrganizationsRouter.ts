import { Request } from 'express';
import Club from '../entities/Club';
import ClubRepo from '../repos/ClubRepo';
import UserRepo from '../repos/UserRepo';
import AuthenticatedApplicationRouter from '../utils/AuthenticatedApplicationRouter';
import LogUtils from '../utils/LogUtils';

class UpdateOrganizationsRouter extends AuthenticatedApplicationRouter<void> {
  constructor() {
    super('POST');
  }

  getPath(): string {
    return '/organizations/';
  }

  async content(req: Request): Promise<void> {
    const { user, body } = req;
    const { clubs } = body;

    if (!clubs) {
      throw Error("Field 'clubs' is missing in the request body.");
    }

    const organizations = await clubs.reduce(
      async (filteredClubs: Promise<Club[]>, name: string) => {
        const collection = await filteredClubs;
        const club = await ClubRepo.getClubByName(name);

        if (club) collection.push(club);
        else {
          LogUtils.logErr(`Organization '${name}' doesn't exist in the database.`);
        }

        return collection;
      },
      Promise.resolve([]),
    );

    await UserRepo.updateUser(user, { clubs: organizations });
  }
}

export default new UpdateOrganizationsRouter().router;
