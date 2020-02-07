import bodyParser from 'body-parser';
import { Router } from 'express';
import ApplicationAPI from './appdev/ApplicationAPI';

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
      v1: [],
    };
  }
}

export default API;