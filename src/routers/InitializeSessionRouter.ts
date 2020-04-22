import { Request } from 'express';
import { OAuth2Client, LoginTicket } from 'google-auth-library';
import { SerializedUserSession } from '../common/types';
import ApplicationRouter from '../utils/ApplicationRouter';
import Club from '../entities/Club';
import ClubRepo from '../repos/ClubRepo';
import CornellMajorRepo from '../repos/CornellMajorRepo';
import Interest from '../entities/Interest';
import InterestRepo from '../repos/InterestRepo';
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
    const { clubs, firstName, googleID, graduationYear, hometown, interests, lastName, netID, major,
      pronouns } = req.body;
    const clubObjects: Club[] =
      await Promise.all(clubs.map(async (name: string) => { return await ClubRepo.getClubByName(name) }));
    const interestObjects: Interest[] =
      await Promise.all(interests.map(async (name: string) => { return await InterestRepo.getInterestByName(name) }));
    const majorObject = await CornellMajorRepo.getCornellMajorByName(major);
    return client
      .verifyIdToken({
        idToken: req.body.idToken,
        audience: process.env.GOOGLE_CLIENT_ID,
      })
      .then((login: LoginTicket) =>
        UserSessionRepo.createUserAndInitializeSession(clubs, googleID, graduationYear, hometown, interests, major,
          pronouns))
      .catch(e => {
        throw Error(e);
      });
  }
}

export default new InitializeSessionRouter().router;
