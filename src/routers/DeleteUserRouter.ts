import { Request } from 'express';
import AuthenticatedAppplicationRouter from '../utils/AuthenticatedApplicationRouter';
import UserRepo from '../repos/UserRepo';

class DeleteUserRouter extends AuthenticatedAppplicationRouter<void> {
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
