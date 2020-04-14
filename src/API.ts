import { Router } from 'express';
import ApplicationAPI from './appdev/ApplicationAPI';
import bodyParser from 'body-parser';
import auth from './appdev/Authenticate';

import DeleteUserRouter from './routers/DeleteUserRouter';
import GetUserRouter from './routers/GetUserRouter';
import HelloRouter from './routers/HelloRouter';
import CreateMatchingRouter from './routers/CreateMatchingRouter';
import UpdateUserRouter from './routers/UpdateUserRouter';
import InitializeSessionRouter from './routers/InitializeSessionRouter';
import RefreshSessionRouter from './routers/RefreshSessionRouter';

class API extends ApplicationAPI {
  getPath(): string {
    return '/api/';
  }

  middleware(): any[] {
    // tslint:disable-next-line: deprecation
    return [bodyParser.json()];
  }

  routerGroups(): { [index: string]: Router[] } {
    return {
      docs: [],
      v1: [
        CreateMatchingRouter,
        DeleteUserRouter,
        GetUserRouter,
        HelloRouter,
        UpdateUserRouter,
        InitializeSessionRouter,
        RefreshSessionRouter,
      ],
    };
  }
}

export default API;
