import { Request } from 'express';
import ApplicationRouter from '../utils/ApplicationRouter';
import Authenticate from '../utils/Authenticate';
import UserRepo from '../repos/UserRepo';

class DeleteUserRouter extends ApplicationRouter<void> {
  constructor() {
    super('DELETE');
  }

  getPath(): string {
    return '/';
  }
  
  middleware() {
    return [Authenticate.ensureAuthenticated];
  }

  async content(req: Request): Promise<void> {
    await UserRepo.deleteUser(req.user);
  }
}

export default new DeleteUserRouter().router;
