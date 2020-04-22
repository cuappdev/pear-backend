import { Request } from 'express';
import { SerializedClub } from '../common/types';
import ApplicationRouter from '../utils/ApplicationRouter';
import Club from '../entities/Club';
import ClubRepo from '../repos/ClubRepo';

class GetClubsRouter extends ApplicationRouter<SerializedClub[]> {
  constructor() {
    super('GET');
  }

  getPath(): string {
    return '/clubs/';
  }

  async content(req: Request): Promise<SerializedClub[]> {
    const callback = (accum: SerializedClub[], currentVal: Club) => {
      accum.push(currentVal.serialize());
      return accum;
    };
    const clubs = await ClubRepo.getClubs();
    return clubs.reduce(callback, []);
  }
}

export default new GetClubsRouter().router;
