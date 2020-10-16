import User from '../entities/User';
import { SerializedUserSession } from '../common/types';

declare global {
  namespace Express {
    interface Request {
      user: User;
      session: SerializedUserSession;
    }
  }
}
