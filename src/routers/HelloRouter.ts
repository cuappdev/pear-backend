import { Request } from 'express';
import ApplicationRouter from '../utils/ApplicationRouter';

class HelloRouter extends ApplicationRouter<String> {
  constructor() {
    super('GET');
  }

  getPath(): string {
    return '/';
  }

  async content(req: Request): Promise<String> {
    return "Hello world!";
  }
}

export default new HelloRouter().router;
