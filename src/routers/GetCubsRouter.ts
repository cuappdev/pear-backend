import { Request } from 'express';
import { SerializedClub } from '../common/types';
import ApplicationRouter from '../utils/ApplicationRouter';
import Authenticate from '../utils/Authenticate';
import ClubRepo from '../repos/ClubRepo';

class GetClubsRouter extends ApplicationRouter<SerializedClub[]> {
  constructor() {
    super('GET');
  }

  getPath(): string {
    return '/clubs/';
  }
    
  middleware() {
    return [Authenticate.ensureAuthenticated];
  }

  async content(req: Request): Promise<SerializedClub[]> {
    const clubs = await ClubRepo.getClubs();
    return clubs.map(clubObject => clubObject.serialize());
  }
}

export default new GetClubsRouter().router;
