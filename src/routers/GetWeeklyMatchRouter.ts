import { Request } from 'express';
import { SerializedMatch } from '../common/types';
import AuthenticatedApplicationRouter from '../utils/AuthenticatedApplicationRouter';
import MatchRepo from '../repos/MatchRepo';

class GetWeeklyMatchRouter extends AuthenticatedApplicationRouter<SerializedMatch[]> {
  constructor() {
    super('GET');
  }

  getPath(): string {
    return '/';
  }

  async content(req: Request): Promise<SerializedMatch[]> {
    const { netID } = req.query;
    const user = await MatchRepo.getWeeklyMatchesByNetID(netID || req.user.netID);
    if (!user) throw Error('User with that netID does not exist');
    return user.map((match) => match.serialize());
  }
}

export default new GetWeeklyMatchRouter().router;
