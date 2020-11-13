import { Request } from 'express';
import { SerializedClub } from '../common/types';
import AuthenticatedApplicationRouter from '../utils/AuthenticatedApplicationRouter';
import ClubRepo from '../repos/ClubRepo';

class GetClubsRouter extends AuthenticatedApplicationRouter<SerializedClub[]> {
  constructor() {
    super('GET');
  }

  getPath(): string {
    return '/all/';
  }

  async content(req: Request): Promise<SerializedClub[]> {
    const clubs = await ClubRepo.getClubs();
    return clubs.map((club) => club.serialize());
  }
}

export default new GetClubsRouter().router;
