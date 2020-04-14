import { Request } from 'express';
import { OAuth2Client, LoginTicket } from 'google-auth-library';
import { SerializedUserSession } from '../common/types';
import ApplicationRouter from '../appdev/ApplicationRouter';
import UserSessionRepo from '../repos/UserSessionRepo';

class InitializeSessionRouter extends ApplicationRouter<SerializedUserSession> {
  constructor() {
    super('POST');
  }

  getPath(): string {
    return '/auth/login/';
  }

  async content(req: Request): Promise<SerializedUserSession> {
    const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

    return client
      .verifyIdToken({
        idToken: req.body.idToken,
        audience: process.env.GOOGLE_CLIENT_ID,
      })
      .then((login: LoginTicket) =>
        UserSessionRepo.createUserAndInitializeSession(login)
      )
      .catch(e => {
        throw Error(e);
      });
  }
}

export default new InitializeSessionRouter().router;
