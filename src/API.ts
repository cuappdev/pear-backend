import ApplicationAPI from './appdev/ApplicationAPI';
import bodyParser from 'body-parser';
import CreateUserRouter from './routers/CreateUserRouter';
import DeleteUserRouter from './routers/DeleteUserRouter';
import GetUserRouter from './routers/GetUserRouter';
import CreateMatchingRouter from './routers/CreateMatchingRouter';
import { Router } from 'express';
import UpdateUserRouter from './routers/UpdateUserRouter';

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
        CreateUserRouter,
        DeleteUserRouter,
        GetUserRouter,
        UpdateUserRouter,
        CreateMatchingRouter
      ],
    };
  }
}

export default API;