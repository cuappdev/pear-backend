import { Request } from 'express';
import { SerializedLocation } from '../common/types';
import Location from '../entities/Location';
import LocationRepo from '../repos/LocationRepo';
import UserRepo from '../repos/UserRepo';
import AuthenticatedApplicationRouter from '../utils/AuthenticatedApplicationRouter';
import LogUtils from '../utils/LogUtils';

class UpdatePreferredLocationsRouter extends AuthenticatedApplicationRouter<void> {
  constructor() {
    super('POST');
  }

  getPath(): string {
    return '/preferredLocations/';
  }

  async content(req: Request): Promise<void> {
    const { user, body } = req;
    const { preferences } = body;

    if (!preferences) {
      throw Error('Missing location preferences list');
    }

    const reducer = async (
      filteredLocations: Promise<Location[]>,
      location: SerializedLocation,
    ) => {
      const collection = await filteredLocations;
      const { area, name } = location;
      const locationEntity: Location = await LocationRepo.getLocation(area, name);

      if (locationEntity) collection.push(locationEntity);
      else {
        LogUtils.logErr(`Location '${name}' in '${area}' doesn't exist in the database.`);
      }
      return collection;
    };

    const preferredLocations = await preferences.reduce(reducer, Promise.resolve([]));

    await UserRepo.updateUser(user, { preferredLocations });
  }
}

export default new UpdatePreferredLocationsRouter().router;
