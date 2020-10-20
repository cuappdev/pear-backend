import { Router } from 'express';
import bodyParser from 'body-parser';
import ApplicationAPI from './utils/ApplicationAPI';
import DeleteUserRouter from './routers/DeleteUserRouter';
import DocsRouter from './routers/DocsRouter';
import GetClubsRouter from './routers/GetClubsRouter';
import GetCornellMajorsRouter from './routers/GetCornellMajorsRouter';
import GetInterestsRouter from './routers/GetInterestsRouter';
import GetUserRouter from './routers/GetUserRouter';
import GetUsersRouter from './routers/GetUsersRouter';
import HelloRouter from './routers/HelloRouter';
import InitializeDevSessionRouter from './routers/InitializeDevSessionRouter';
import InitializeSessionRouter from './routers/InitializeSessionRouter';
import RefreshSessionRouter from './routers/RefreshSessionRouter';
import SearchUsersRouter from './routers/SearchUsersRouter';
import UpdateDemographicsRouter from './routers/UpdateDemographicsRouter';
import UpdateInterestsRouter from './routers/UpdateInterestsRouter';
import UpdateOrganizationsRouter from './routers/UpdateOrganizationsRouter';
import UpdateSocialMediaRouter from './routers/UpdateSocialMediaRouter';

class API extends ApplicationAPI {
  getPath(): string {
    return '/api/';
  }

  middleware(): any[] {
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
        DeleteUserRouter,
        GetUserRouter,
        GetUsersRouter,
        GetClubsRouter,
        GetCornellMajorsRouter,
        GetInterestsRouter,
        SearchUsersRouter,
        UpdateDemographicsRouter,
        UpdateInterestsRouter,
        UpdateOrganizationsRouter,
        UpdateSocialMediaRouter,
      ],
    };
  }
}

export default API;
