import { Request } from 'express';
import UserRepo from '../repos/UserRepo';
import AuthenticatedApplicationRouter from '../utils/AuthenticatedApplicationRouter';

class UpdateInterestsRouter extends AuthenticatedApplicationRouter<void> {
  constructor() {
    super('POST');
  }

  getPath(): string {
    return '/socialMedia/';
  }

  async content(req: Request): Promise<void> {
    const { user, body } = req;

    const validFields = ['facebook', 'instagram', 'didOnboard'];

    Object.keys(body).forEach((key) => {
      if (!validFields.includes(key)) {
        throw Error(`Invalid field '${key}' identified in request body.`);
      }
    });

    await UserRepo.updateUser(user, body);
  }
}

export default new UpdateInterestsRouter().router;
