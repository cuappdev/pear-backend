import { Request } from 'express';
import ApplicationRouter from '../utils/ApplicationRouter';
import UserRepo from '../repos/UserRepo';

class DeleteUserRouter extends ApplicationRouter<void> {
  constructor() {
    super('DELETE');
  }

  getPath(): string {
    return '/user/';
  }

  async content(req: Request): Promise<void> {
    const { netID } = req.query;
    await UserRepo.deleteUser(netID);
  }
}

export default new DeleteUserRouter().router;
