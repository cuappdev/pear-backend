import { Request } from 'express';
import { SerializedInterest } from '../common/types';
import AuthenticatedApplicationRouter from '../utils/AuthenticatedApplicationRouter';
import InterestRepo from '../repos/InterestRepo';

class GetInterestsRouter extends AuthenticatedApplicationRouter<SerializedInterest[]> {
  constructor() {
    super('GET');
  }

  getPath(): string {
    return '/all/';
  }

  async content(req: Request): Promise<SerializedInterest[]> {
    const interests = await InterestRepo.getInterests();
    return interests.map((interest) => interest.serialize());
  }
}

export default new GetInterestsRouter().router;
