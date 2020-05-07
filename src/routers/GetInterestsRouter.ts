import { Request } from 'express';
import { SerializedInterest } from '../common/types';
import AuthenticatedAppplicationRouter from '../utils/AuthenticatedApplicationRouter';
import InterestRepo from '../repos/InterestRepo';

class GetInterestsRouter extends AuthenticatedAppplicationRouter<
  SerializedInterest[]
> {
  constructor() {
    super('GET');
  }

  getPath(): string {
    return '/interests/';
  }

  async content(req: Request): Promise<SerializedInterest[]> {
    const interests = await InterestRepo.getInterests();
    return interests.map(interestObject => interestObject.serialize());
  }
}

export default new GetInterestsRouter().router;
