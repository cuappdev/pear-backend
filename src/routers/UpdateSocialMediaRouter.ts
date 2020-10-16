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

    const validFields = ["facebook", "instagram"];

    for (const key in body) {
      if (!validFields.includes(key)) {
        throw Error(`Invalid field '${key}' identified in request body.`);
      }

      if (!AppDevUtils.validateURL(body[key])) {
        throw Error(`URL provided for '${key}' is not valid.`);
      }
    }

    await UserRepo.updateUser(user, body);
  }
}

export default new UpdateInterestsRouter().router;
