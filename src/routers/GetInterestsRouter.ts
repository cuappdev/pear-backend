import { Request } from 'express';
import { SerializedInterest } from '../common/types';
import ApplicationRouter from '../utils/ApplicationRouter';
import Authenticate from '../utils/Authenticate';
import InterestRepo from '../repos/InterestRepo';

class GetInterestsRouter extends ApplicationRouter<SerializedInterest[]> {
  constructor() {
    super('GET');
  }

  getPath(): string {
    return '/interests/';
  }
 
  middleware() {
    return [Authenticate.ensureAuthenticated];
  }

  async content(req: Request): Promise<SerializedInterest[]> {
    const interests = await InterestRepo.getInterests();
    return interests.map(interestObject => interestObject.serialize());
  }
}

export default new GetInterestsRouter().router;
