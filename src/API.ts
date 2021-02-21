import { Router } from 'express';
import bodyParser from 'body-parser';
import ApplicationAPI from './utils/ApplicationAPI';
import CancelMatchRouter from './routers/CancelMatchRouter';
import CreateDevMatchRouter from './routers/CreateDevMatchRouter';
import DeleteUserRouter from './routers/DeleteUserRouter';
import DocsRouter from './routers/DocsRouter';
import GetCommunityUserRouter from './routers/GetCommunityUserRouter';
import GetCommunityUsersRouter from './routers/GetCommunityUsersRouter';
import GetCornellMajorsRouter from './routers/GetCornellMajorsRouter';
import GetGroupsRouter from './routers/GetGroupsRouter';
import GetInterestsRouter from './routers/GetInterestsRouter';
import GetMatchHistoryRouter from './routers/GetMatchHistoryRouter';
import GetUserAvailabilitiesRouter from './routers/GetUserAvailabilitiesRouter';
import GetUserDemographicsRouter from './routers/GetUserDemographicsRouter';
import GetUserGoalsRouter from './routers/GetUserGoalsRouter';
import GetUserGroupsRouter from './routers/GetUserGroupsRouter';
import GetUserInterestsRouter from './routers/GetUserInterestsRouter';
import GetUserLocationsRouter from './routers/GetUserLocationsRouter';
import GetUserSocialMediaRouter from './routers/GetUserSocialMediaRouter';
import GetUserTalkingPointsRouter from './routers/GetUserTalkingPointsRouter';
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
import UpdatePreferredLocationsRouter from './routers/UpdatePreferredLocationsRouter';
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
        GetCommunityUserRouter,
        GetCommunityUsersRouter,
        SearchUsersRouter,
        GetUserAvailabilitiesRouter,
        UpdateAvailabilitiesRouter,
        GetUserDemographicsRouter,
        UpdateDemographicsRouter,
        GetUserInterestsRouter,
        UpdateInterestsRouter,
        GetUserGoalsRouter,
        UpdateGoalsRouter,
        GetUserGroupsRouter,
        UpdateGroupsRouter,
        GetUserLocationsRouter,
        UpdatePreferredLocationsRouter,
        GetUserSocialMediaRouter,
        UpdateSocialMediaRouter,
        GetUserTalkingPointsRouter,
        UpdateTalkingPointsRouter,
      ],
    };
  }
}

export default API;
