import { Request } from 'express';
import AuthenticatedApplicationRouter from '../utils/AuthenticatedApplicationRouter';
import UserRepo from '../repos/UserRepo';

class DeleteUserRouter extends AuthenticatedApplicationRouter<void> {
  constructor() {
    super('DELETE');
  }

  getPath(): string {
    return '/';
  }

  async content(req: Request): Promise<void> {
    await UserRepo.deleteUser(req.user);
  }
}

export default new DeleteUserRouter().router;
