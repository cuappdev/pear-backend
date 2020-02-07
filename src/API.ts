import bodyParser from 'body-parser';
import { Router } from 'express';
import ApplicationAPI from './appdev/ApplicationAPI';
import CreateUserRouter from './routers/CreateUserRouter'

class API extends ApplicationAPI {
  getPath(): string {
    return '/api/';
  }

  middleware(): any[] {
    return [
      bodyParser.json(),
    ];
  }

  routerGroups(): { [index: string]: Router[] } {
    return {
      docs: [],
      v1: [
        CreateUserRouter
      ],
    };
  }
}

export default API;