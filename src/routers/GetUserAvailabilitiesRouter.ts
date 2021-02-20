import { Request } from 'express';
import { SerializedAvailability } from '../common/types';
import AuthenticatedApplicationRouter from '../utils/AuthenticatedApplicationRouter';
import AvailabilityRepo from '../repos/AvailabilityRepo';

class GetUserAvailabilitiesRouter extends AuthenticatedApplicationRouter<SerializedAvailability[]> {
  constructor() {
    super('GET');
  }

  getPath(): string {
    return '/availabilities';
  }

  async content(req: Request): Promise<SerializedAvailability[]> {
    const { netID } = req.query;
    const availabilities = await AvailabilityRepo.getAvailabilitiesByNetID(netID || req.user.netID);
    return availabilities.map((availability) => availability.serialize());
  }
}

export default new GetUserAvailabilitiesRouter().router;
