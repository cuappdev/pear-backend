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
    const matches = await MatchRepo.getWeeklyMatchesByNetID(netID || req.user.netID);
    return matches.map((match) => match.serialize());
  }
}

export default new GetWeeklyMatchRouter().router;
