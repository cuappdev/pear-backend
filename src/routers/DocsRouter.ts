import { Request } from 'express';
import * as swaggerUI from 'swagger-ui-express';
import ApplicationRouter from '../utils/ApplicationRouter';
import * as swaggerDocument from '../swagger.json';

class DocsRouter extends ApplicationRouter<any> {
  constructor() {
    super('GET');
  }

  getPath(): string {
    return '/';
  }

  middleware() {
    return [swaggerUI.serve, swaggerUI.setup(swaggerDocument)];
  }

  async content(req: Request): Promise<void> {
    return null;
  }
}

export default new DocsRouter().router;
