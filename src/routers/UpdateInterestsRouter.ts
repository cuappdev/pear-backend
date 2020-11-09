import { Request } from 'express';
import Interest from '../entities/Interest';
import InterestRepo from '../repos/InterestRepo';
import UserRepo from '../repos/UserRepo';
import AuthenticatedAppplicationRouter from '../utils/AuthenticatedApplicationRouter';
import LogUtils from '../utils/LogUtils';

class UpdateInterestsRouter extends AuthenticatedAppplicationRouter<void> {
  constructor() {
    super('POST');
  }

  getPath(): string {
    return '/interests/';
  }

  async content(req: Request): Promise<void> {
    const { user, body } = req;
    const { interests } = body;

    if (!interests) {
      throw Error("Field 'interests' is missing in the request body.");
    }

    const interestList = await interests.reduce(
      async (filteredInterests: Promise<Interest[]>, name: string) => {
        const collection = await filteredInterests;
        const interest = await InterestRepo.getInterestByName(name);

        if (interest) collection.push(interest);
        else {
          LogUtils.logErr(`Interest '${name}' doesn't exist in the database.`);
        }

        return collection;
      },
      Promise.resolve([]),
    );

    await UserRepo.updateUser(user, { interests: interestList });
  }
}

export default new UpdateInterestsRouter().router;
