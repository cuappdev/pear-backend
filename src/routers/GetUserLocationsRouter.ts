import { Request } from 'express';
import { SerializedLocation } from '../common/types';
import AuthenticatedApplicationRouter from '../utils/AuthenticatedApplicationRouter';
import LocationRepo from '../repos/LocationRepo';

class GetUserLocationsRouter extends AuthenticatedApplicationRouter<SerializedLocation[]> {
  constructor() {
    super('GET');
  }

  getPath(): string {
    return '/preferredLocations';
  }

  async content(req: Request): Promise<SerializedLocation[]> {
    const { netID } = req.query;
    const preferredLocations = await LocationRepo.getLocationsByNetID(netID || req.user.netID);
    return preferredLocations.map((location) => location.serialize());
  }
}

export default new GetUserLocationsRouter().router;
