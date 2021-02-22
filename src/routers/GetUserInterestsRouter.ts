import { Request } from 'express';
import { SerializedInterest } from '../common/types';
import AuthenticatedApplicationRouter from '../utils/AuthenticatedApplicationRouter';
import InterestRepo from '../repos/InterestRepo';

class GetUserInterestsRouter extends AuthenticatedApplicationRouter<SerializedInterest[]> {
  constructor() {
    super('GET');
  }

  getPath(): string {
    return '/interests';
  }

  async content(req: Request): Promise<SerializedInterest[]> {
    const { netID } = req.query;
    const interests = await InterestRepo.getInterestsByNetID(netID || req.user.netID);
    return interests.map((interest) => interest.serialize());
  }
}

export default new GetUserInterestsRouter().router;
