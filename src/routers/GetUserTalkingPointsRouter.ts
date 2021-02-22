import { Request } from 'express';
import { SerializedTalkingPoint } from '../common/types';
import AuthenticatedApplicationRouter from '../utils/AuthenticatedApplicationRouter';
import TalkingPointRepo from '../repos/TalkingPointRepo';

class GetUserTalkingPointsRouter extends AuthenticatedApplicationRouter<SerializedTalkingPoint[]> {
  constructor() {
    super('GET');
  }

  getPath(): string {
    return '/talkingPoints';
  }

  async content(req: Request): Promise<SerializedTalkingPoint[]> {
    const { netID } = req.query;
    const talkingPoints = await TalkingPointRepo.getTalkingPointsByNetID(netID || req.user.netID);
    return talkingPoints.map((talkingPoint) => talkingPoint.serialize());
  }
}

export default new GetUserTalkingPointsRouter().router;
