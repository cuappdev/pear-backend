import { Router } from 'express';
import ApplicationAPI from './utils/ApplicationAPI';
import bodyParser from 'body-parser';
import CreateMatchingRouter from './routers/CreateMatchingRouter';
import DeleteUserRouter from './routers/DeleteUserRouter';
import GetClubsRouter from './routers/GetCubsRouter';
import GetCornellMajorsRouter from './routers/GetCornellMajorsRouter';
import GetInterestsRouter from './routers/GetInterestsRouter';
import GetUserRouter from './routers/GetUserRouter';
import HelloRouter from './routers/HelloRouter';
import InitializeSessionRouter from './routers/InitializeSessionRouter';
import RefreshSessionRouter from './routers/RefreshSessionRouter';
import UpdateUserRouter from './routers/UpdateUserRouter';

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
        GetClubsRouter,
        GetCornellMajorsRouter,
        GetInterestsRouter,
        HelloRouter,
        InitializeSessionRouter,
        RefreshSessionRouter,
        UpdateUserRouter,
      ],
    };
  }
}

export default API;
