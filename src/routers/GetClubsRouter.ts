import { Request } from 'express';
import { SerializedClub } from '../common/types';
import AuthenticatedAppplicationRouter from '../utils/AuthenticatedApplicationRouter';
import ClubRepo from '../repos/ClubRepo';
class GetClubsRouter extends AuthenticatedAppplicationRouter<SerializedClub[]> {
  constructor() {
    super('GET');
  }

  getPath(): string {
    return '/clubs/';
  }

  async content(req: Request): Promise<SerializedClub[]> {
    const clubs = await ClubRepo.getClubs();
    return clubs.map(clubObject => clubObject.serialize());
  }
}

export default new GetClubsRouter().router;
