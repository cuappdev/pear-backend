import { Request } from 'express';
import { SerializedMatch } from '../common/types';
import AuthenticatedApplicationRouter from '../utils/AuthenticatedApplicationRouter';
import MatchRepo from '../repos/MatchRepo';

class GetMatchHistoryRouter extends AuthenticatedApplicationRouter<SerializedMatch[]> {
  constructor() {
    super('GET');
  }

  getPath(): string {
    return '/history/';
  }

  async content(req: Request): Promise<SerializedMatch[]> {
    const { netID } = req.query;
    const matchHistory = await MatchRepo.getMatchHistoryByNetID(netID || req.user.netID);
    return matchHistory.map((match) => match.serialize());
  }
}

export default new GetMatchHistoryRouter().router;
