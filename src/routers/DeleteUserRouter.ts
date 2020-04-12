import { Request } from 'express';
import UserRepo from '../repos/UserRepo';
import ApplicationRouter from '../appdev/ApplicationRouter';

class DeleteUserRouter extends ApplicationRouter<void> {
  constructor() {
    super('DELETE');
  }

  getPath(): string {
    return '/user/';
  }

  async content(req: Request): Promise<void> {
    const { accessToken } = req.query;
    await UserRepo.deleteUser(accessToken);
  }
}

export default new DeleteUserRouter().router;
