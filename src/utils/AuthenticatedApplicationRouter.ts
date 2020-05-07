import { ExpressCallback } from './ApplicationAPI';
import ApplicationRouter from './ApplicationRouter';
import Authenticate from './Authenticate';

class AuthenticatedAppplicationRouter<T> extends ApplicationRouter<T> {
  middleware(): ExpressCallback[] {
    return [Authenticate.ensureAuthenticated];
  }
}

export default AuthenticatedAppplicationRouter;
