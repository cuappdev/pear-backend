import { Request } from 'express';
import { SerializedInterest } from '../common/types';
import ApplicationRouter from '../utils/ApplicationRouter';
import Interest from '../entities/Interest'
import InterestRepo from '../repos/InterestRepo';

class GetInterestsRouter extends ApplicationRouter<SerializedInterest[]> {
  constructor() {
    super('GET');
  }

  getPath(): string {
    return '/interests/';
  }

  async content(req: Request): Promise<SerializedInterest[]> {
    const callback = (accum: SerializedInterest[], currentVal: Interest) => {
      accum.push(currentVal.serialize());
      return accum;
    };
    const interests = await InterestRepo.getInterests();
    return interests.reduce(callback, []);
  }
}

export default new GetInterestsRouter().router;
