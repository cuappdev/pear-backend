import ApplicationAPI from './appdev/ApplicationAPI';
import bodyParser from 'body-parser';
import CreateUserRouter from './routers/CreateUserRouter';
import DeleteUserRouter from './routers/DeleteUserRouter';
import GetUserRouter from './routers/GetUserRouter';
import { Router } from 'express';
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
      v1: [CreateUserRouter, DeleteUserRouter, GetUserRouter, UpdateUserRouter],
    };
  }
}

export default API;
