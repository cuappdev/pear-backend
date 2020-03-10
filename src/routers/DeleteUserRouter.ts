import { Request } from 'express';
import ApplicationRouter from '../appdev/ApplicationRouter';
import UserRepo from '../repos/UserRepo';

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
