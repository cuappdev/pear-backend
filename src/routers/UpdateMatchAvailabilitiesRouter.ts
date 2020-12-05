import { Request } from 'express';
import Constants from '../common/constants';
import Availability from '../entities/Availability';
import AvailabilityRepo from '../repos/AvailabilityRepo';
import MatchRepo from '../repos/MatchRepo';
import AuthenticatedApplicationRouter from '../utils/AuthenticatedApplicationRouter';

class UpdateMatchAvailabilitiesRouter extends AuthenticatedApplicationRouter<void> {
  constructor() {
    super('POST');
  }

  getPath(): string {
    return '/availabilities/';
  }

  async content(req: Request): Promise<void> {
    const { matchID, schedule } = req.body;

    if (!matchID) throw Error('Missing required matchID');
    if (!schedule) throw Error('Missing required schedule list');

    let status;
    const match = await MatchRepo.getMatchByID(matchID);

    // Logic to update match status
    if (match.status === Constants.MATCH_CREATED) {
      status = Constants.MATCH_PROPOSED;
    } else if (match.status === Constants.MATCH_PROPOSED) {
      status = Constants.MATCH_ACTIVE;
      // Meeting time has to be finalized if match is moving forward from status = active
      if (schedule.length !== 1 || schedule[0].times.length !== 1) {
        throw Error('Schedule must contain exactly one day and one time to finalize the match!');
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
        availability.times.forEach((time) => {
          if (!Constants.VALID_TIMES.includes(time)) {
            throw Error(`Invalid time '${time}' identified under '${day}'.`);
          }
        });
      } else {
        throw Error(`Missing times field in schedule list entry under '${day}'.`);
      }
    });

    const availabilities = await schedule.reduce(
      async (availabilitiesList: Promise<Availability[]>, availability) => {
        const collection = await availabilitiesList;
        const { day, times } = availability;

        const availabilityEntity: Availability = await AvailabilityRepo.getAvailability(day, times);
        collection.push(availabilityEntity);
        return collection;
      },
      Promise.resolve([]),
    );

    await MatchRepo.updateMatch(match, { availabilities, status });
  }
}

export default new UpdateMatchAvailabilitiesRouter().router;
