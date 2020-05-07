import { AppDevResponse } from './AppDevResponse';
import { NextFunction, Response, Request } from 'express';
import UserSessionRepo from '../repos/UserSessionRepo';

function parseToken(req: Request, res: Response): string {
  const header = req.get('Authorization');
  if (!header) {
    res
      .status(401)
      .json(
        new AppDevResponse(false, { errors: ['Authorization header missing'] })
      );
    return '';
  }
  const bearerToken = header.replace('Bearer ', '').trim();
  if (!bearerToken) {
    res
      .status(401)
      .json(
        new AppDevResponse(false, { errors: ['Invalid authorization header'] })
      );
    return '';
  }
  return bearerToken;
}

async function ensureAuthenticated(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const bearerToken = parseToken(req, res);

  if (bearerToken === '') return;

  if (!(await UserSessionRepo.verifySession(bearerToken))) {
    return res
      .status(401)
      .json(new AppDevResponse(false, { errors: ['Invalid access token'] }));
  }
  const user = await UserSessionRepo.getUserFromToken(bearerToken);
  req.user = user;
  return next();
}

async function updateSession(req: Request, res: Response, next: NextFunction) {
  const bearerToken = parseToken(req, res);

  if (bearerToken === '') return;

  const session = await UserSessionRepo.updateSession(bearerToken);
  if (!session) {
    return res
      .status(401)
      .json(new AppDevResponse(false, { errors: ['Invalid refresh token'] }));
  }
  req.session = session;
  return next();
}

export default {
  ensureAuthenticated,
  updateSession,
};
