import ApplicationRouter from '../appdev/ApplicationRouter';
import { Request } from 'express';
import UserRepo from '../repos/UserRepo';

class UpdateUserRouter extends ApplicationRouter<void> {
  constructor() {
    super('POST');
  }

  getPath(): string {
    return '/user/update/';
  }

  async content(req: Request): Promise<void> {
    const { firstName, lastName, netID } = req.body;
    const currentNetID = req.query.netID;
    const user = await UserRepo.getUserByNetID(currentNetID);
    await UserRepo.updateUser(
      currentNetID,
      firstName == null ? user.firstName : firstName,
      lastName == null ? user.lastName : lastName,
      netID == null ? user.netID : netID
    );
  }
}

export default new UpdateUserRouter().router;
