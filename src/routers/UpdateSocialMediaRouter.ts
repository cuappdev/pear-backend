import { Request } from 'express';
import UserRepo from '../repos/UserRepo';
import AuthenticatedAppplicationRouter from '../utils/AuthenticatedApplicationRouter';
import AppDevUtils from '../utils/AppDevUtils';

class UpdateInterestsRouter extends AuthenticatedAppplicationRouter<void> {
  constructor() {
    super('POST');
  }

  getPath(): string {
    return '/updateSocialMedia/';
  }

  async content(req: Request): Promise<void> {
    const { user, body } = req;
    const { facebook, instagram } = body;

    if (!(facebook || instagram)) {
      throw Error("At least one of 'facebook' or 'instagram' is required.");
    }

    let payload = {};
    if (facebook) {
      if (!AppDevUtils.validateURL(facebook)) {
        throw Error("URL provided for 'facebook' is not valid.")
      }
      payload = { ...payload, facebook };
    }

    if (instagram) {
      if (!AppDevUtils.validateURL(instagram)) {
        throw Error("URL provided for 'instagram' is not valid.")
      }
      payload = { ...payload, instagram };
    }

    await UserRepo.updateUser(user, payload);
  }
}

export default new UpdateInterestsRouter().router;
