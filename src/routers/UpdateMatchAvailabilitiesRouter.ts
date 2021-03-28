import { Request } from 'express';
import Constants from '../common/constants';
import { SerializedAvailability, SerializedLocation } from '../common/types';
import Availability from '../entities/Availability';
import AvailabilityRepo from '../repos/AvailabilityRepo';
import Location from '../entities/Location';
import LocationRepo from '../repos/LocationRepo';
import MatchRepo from '../repos/MatchRepo';
import AuthenticatedApplicationRouter from '../utils/AuthenticatedApplicationRouter';
import LogUtils from '../utils/LogUtils';

class UpdateMatchAvailabilitiesRouter extends AuthenticatedApplicationRouter<void> {
  constructor() {
    super('POST');
  }

  getPath(): string {
    return '/availabilities/';
  }

  async content(req: Request): Promise<void> {
    const { matchID, schedule, preferences } = req.body;

    if (!matchID) throw Error('Missing required matchID');
    if (!schedule) throw Error('Missing required schedule list');
    if (!preferences) throw Error('Missing required location list');

    let status;
    const match = await MatchRepo.getMatchByID(matchID);

    // Logic to update match status
    if (match.status === Constants.MATCH_CREATED) {
      status = Constants.MATCH_PROPOSED;
    } else if (match.status === Constants.MATCH_PROPOSED) {
      status = Constants.MATCH_ACTIVE;
      // Meeting time has to be finalized if match is moving forward from status = active
      if (schedule.length !== 1 || schedule[0].times.length !== 1) {
        throw Error(
          'Schedule must contain exactly one day, time, and location to finalize the match!',
        );
      }
      // TODO: set meeting time properly
    } else {
      throw Error('Cannot update match availability at this stage!');
    }

    schedule.forEach((availability) => {
      const { day, times } = availability;

      if (day) {
        if (!Constants.VALID_DAYS.includes(day)) {
          throw Error(`Invalid day '${day}' identified in schedule list.`);
        }
      } else {
        throw Error('Missing day field in schedule list entry.');
      }

      if (times) {
        availability.times = [...new Set(times)]; // remove duplicates then sort
        availability.times.sort();
        times.forEach((time) => {
          if (!Constants.VALID_TIMES.includes(time)) {
            throw Error(`Invalid time '${time}' identified under '${day}'.`);
          }
        });
      } else {
        throw Error(`Missing times field in schedule list entry under '${day}'.`);
      }
    });

    const availabilities = await schedule.reduce(
      async (availabilitiesList: Promise<Availability[]>, availability: SerializedAvailability) => {
        const collection = await availabilitiesList;
        const { day, times } = availability;

        const availabilityEntity: Availability = await AvailabilityRepo.getAvailability(day, times);
        collection.push(availabilityEntity);
        return collection;
      },
      Promise.resolve([]),
    );

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

    await MatchRepo.updateMatch(match, { availabilities, preferredLocations, status });
  }
}

export default new UpdateMatchAvailabilitiesRouter().router;
