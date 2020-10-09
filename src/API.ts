import { Router } from 'express';
import ApplicationAPI from './utils/ApplicationAPI';
import bodyParser from 'body-parser';
import CreateMatchingRouter from './routers/CreateMatchingRouter';
import DeleteUserRouter from './routers/DeleteUserRouter';
import DocsRouter from './routers/DocsRouter';
import GetClubsRouter from './routers/GetClubsRouter';
import GetCornellMajorsRouter from './routers/GetCornellMajorsRouter';
import GetInterestsRouter from './routers/GetInterestsRouter';
import GetUserRouter from './routers/GetUserRouter';
import HelloRouter from './routers/HelloRouter';
import InitializeSessionRouter from './routers/InitializeSessionRouter';
import RefreshSessionRouter from './routers/RefreshSessionRouter';
import UpdateDemographicsRouter from './routers/UpdateDemographicsRouter';
import InitializeDevSessionRouter from './routers/InitializeDevSessionRouter';
import UpdateInterestsRouter from './routers/UpdateInterestsRouter';

class API extends ApplicationAPI {
  getPath(): string {
    return '/api/';
  }

  middleware(): any[] {
    // tslint:disable-next-line: deprecation
    return [bodyParser.json()];
  }

  versions() {
    return { v1: this.routerGroups() };
  }

  routerGroups(): { [index: string]: Router[] } {
    return {
      auth: [InitializeSessionRouter],
      dev: [InitializeDevSessionRouter],
      docs: [DocsRouter],
      general: [HelloRouter],
      refresh: [RefreshSessionRouter],
      user: [
        CreateMatchingRouter,
        DeleteUserRouter,
        GetUserRouter,
        GetClubsRouter,
        GetCornellMajorsRouter,
        GetInterestsRouter,
        UpdateDemographicsRouter,
        UpdateInterestsRouter,
      ],
    };
  }
}

export default API;
