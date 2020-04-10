import { Router } from 'express';
import ApplicationAPI from './appdev/ApplicationAPI';
import bodyParser from 'body-parser';
import CreateUserRouter from './routers/CreateUserRouter';
import DeleteUserRouter from './routers/DeleteUserRouter';
import GetUserRouter from './routers/GetUserRouter';
import HelloRouter from './routers/HelloRouter';
import CreateMatchingRouter from './routers/CreateMatchingRouter';
import UpdateUserRouter from './routers/UpdateUserRouter';

class API extends ApplicationAPI {
  getPath(): string {
    return '/api/';
  }

  middleware(): any[] {
    return [bodyParser.json()];
  }

  routerGroups(): { [index: string]: Router[] } {
    return {
      docs: [],
      v1: [
        CreateMatchingRouter,
        CreateUserRouter,
        DeleteUserRouter,
        GetUserRouter,
        HelloRouter,
        UpdateUserRouter,
      ],
    };
  }
}

export default API;
