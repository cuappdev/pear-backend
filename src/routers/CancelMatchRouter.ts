import { Request } from 'express';
import Constants from '../common/constants';
import MatchRepo from '../repos/MatchRepo';
import AuthenticatedApplicationRouter from '../utils/AuthenticatedApplicationRouter';

class UpdateMatchAvailabilitiesRouter extends AuthenticatedApplicationRouter<void> {
  constructor() {
    super('POST');
  }

  getPath(): string {
    return '/cancel/';
  }

  async content(req: Request): Promise<void> {
    const { matchID } = req.query;
    if (!matchID) throw Error('Missing required matchID');

    const match = await MatchRepo.getMatchByID(matchID);
    if (match.status !== Constants.MATCH_ACTIVE || match.status !== Constants.MATCH_INACTIVE)
      await MatchRepo.updateMatch(match, { status: Constants.MATCH_CANCELED });
  }
}

export default new UpdateMatchAvailabilitiesRouter().router;
