import { Router } from 'express';
import bodyParser from 'body-parser';
import ApplicationAPI from './utils/ApplicationAPI';
import CancelMatchRouter from './routers/CancelMatchRouter';
import CreateDevMatchRouter from './routers/CreateDevMatchRouter';
import DeleteUserRouter from './routers/DeleteUserRouter';
import DocsRouter from './routers/DocsRouter';
import GetCornellMajorsRouter from './routers/GetCornellMajorsRouter';
import GetGroupsRouter from './routers/GetGroupsRouter';
import GetInterestsRouter from './routers/GetInterestsRouter';
import GetMatchHistoryRouter from './routers/GetMatchHistoryRouter';
import GetUserRouter from './routers/GetUserRouter';
import GetUsersRouter from './routers/GetUsersRouter';
import GetWeeklyMatchRouter from './routers/GetWeeklyMatchRouter';
import HelloRouter from './routers/HelloRouter';
import InitializeDevSessionRouter from './routers/InitializeDevSessionRouter';
import InitializeSessionRouter from './routers/InitializeSessionRouter';
import RefreshSessionRouter from './routers/RefreshSessionRouter';
import SearchUsersRouter from './routers/SearchUsersRouter';
import UpdateAvailabilitiesRouter from './routers/UpdateAvailabilitiesRouter';
import UpdateDemographicsRouter from './routers/UpdateDemographicsRouter';
import UpdateGoalsRouter from './routers/UpdateGoalsRouter';
import UpdateGroupsRouter from './routers/UpdateGroupsRouter';
import UpdateInterestsRouter from './routers/UpdateInterestsRouter';
import UpdateMatchAvailabilitiesRouter from './routers/UpdateMatchAvailabilitiesRouter';
import UpdateSocialMediaRouter from './routers/UpdateSocialMediaRouter';
import UpdateTalkingPointsRouter from './routers/UpdateTalkingPointsRouter';

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
      dev: [CreateDevMatchRouter, InitializeDevSessionRouter],
      docs: [DocsRouter],
      general: [HelloRouter],
      group: [GetGroupsRouter],
      interest: [GetInterestsRouter],
      match: [
        CancelMatchRouter,
        GetMatchHistoryRouter,
        GetWeeklyMatchRouter,
        UpdateMatchAvailabilitiesRouter,
      ],
      major: [GetCornellMajorsRouter],
      refresh: [RefreshSessionRouter],
      user: [
        DeleteUserRouter,
        GetUserRouter,
        GetUsersRouter,
        SearchUsersRouter,
        UpdateAvailabilitiesRouter,
        UpdateDemographicsRouter,
        UpdateInterestsRouter,
        UpdateGoalsRouter,
        UpdateGroupsRouter,
        UpdateSocialMediaRouter,
        UpdateTalkingPointsRouter,
      ],
    };
  }
}

export default API;
