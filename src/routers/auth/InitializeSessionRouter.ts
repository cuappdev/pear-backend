import { Request } from 'express';
import { OAuth2Client } from 'google-auth-library';

import ApplicationRouter from '../../appdev/ApplicationRouter';

import UserSessionRepo from '../../repos/UserSessionRepo';
import { SerializedUserSession } from '../../common/types';

class InitializeSessionRouter extends ApplicationRouter<void | SerializedUserSession> {
    constructor() {
        super('POST');
    }

    getPath(): string {
        return '/auth/'
    }

    async content(req: Request): Promise<void | SerializedUserSession> {
        const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

        return client
        .verifyIdToken({
            idToken: req.body.idToken,
            audience: process.env.GOOGLE_CLIENT_ID
        })
        .then(login => UserSessionRepo.createUserAndInitializeSession(login))
        .catch((e) => {console.log('Error authenticating ', e)})
        
        ;
    }
}