import { Request } from 'express';
import TalkingPoint from '../entities/TalkingPoint';
import TalkingPointRepo from '../repos/TalkingPointRepo';
import UserRepo from '../repos/UserRepo';
import AuthenticatedApplicationRouter from '../utils/AuthenticatedApplicationRouter';
import LogUtils from '../utils/LogUtils';

class UpdateTalkingPointsRouter extends AuthenticatedApplicationRouter<void> {
  constructor() {
    super('POST');
  }

  getPath(): string {
    return '/talkingPoints/';
  }

  async content(req: Request): Promise<void> {
    const { user, body } = req;
    const { talkingPoints } = body;

    if (!talkingPoints) {
      throw Error("Field 'talkingPoints' is missing in the request body.");
    }

    const talkingPointList = await talkingPoints.reduce(
      async (filteredTalkingPoints: Promise<TalkingPoint[]>, name: string) => {
        const collection = await filteredTalkingPoints;
        const talkingPoint = await TalkingPointRepo.getTalkingPointByName(name);

        if (talkingPoint) collection.push(talkingPoint);
        else {
          LogUtils.logErr(`Talking Point '${name}' doesn't exist in the database.`);
        }

        return collection;
      },
      Promise.resolve([]),
    );

    await UserRepo.updateUser(user, { talkingPoints: talkingPointList });
  }
}

export default new UpdateTalkingPointsRouter().router;
