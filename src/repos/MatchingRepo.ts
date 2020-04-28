import { getConnectionManager, Repository } from 'typeorm';
import Constants from '../common/constants';
import DaySchedule from '../entities/DaySchedule';
import Matching from '../entities/Matching';
import Time from '../entities/Time';
import User from '../entities/User';

const dayScheduleDB = (): Repository<DaySchedule> =>
  getConnectionManager()
    .get()
    .getRepository(DaySchedule);
const matchingDB = (): Repository<Matching> =>
  getConnectionManager()
    .get()
    .getRepository(Matching);
const timeDB = (): Repository<Time> =>
  getConnectionManager()
    .get()
    .getRepository(Time);
const userDB = (): Repository<User> =>
  getConnectionManager()
    .get()
    .getRepository(User);

const createTime = async (time: number): Promise<void> => {
  if (!Constants.VALID_TIMES.includes(time)) {
    throw Error('Invalid time');
  }
  const possibleTime = await timeDB().findOne({ time });
  if (!possibleTime) {
    const timeObj = timeDB().create({
      time,
    });
    await timeDB().save(timeObj);
  }
};

const createDaySchedule = async (
  day: string,
  times: number[]
): Promise<DaySchedule> => {
  if (!Constants.VALID_DAYS.includes(day)) {
    throw Error(
      'Invalid day ' + day + ' is not in [' + Constants.VALID_DAYS + ']'
    );
  }
  const daySchedule = dayScheduleDB().create({
    day,
    times: [],
  });
  for await (const time of times) {
    if (!Constants.VALID_TIMES.includes(time)) {
      throw Error(
        'Invalid time ' + time + ' is not in [' + Constants.VALID_TIMES + ']'
      );
    }
    const timeObj = await timeDB().findOne({ time });
    if (!timeObj) throw new Error('Internal error');
    daySchedule.times.push(timeObj);
    await timeDB().save(timeObj);
  }
  await dayScheduleDB().save(daySchedule);
  return daySchedule;
};

const createMatching = async (
  users: User[],
  schedule: DaySchedule[]
): Promise<Matching> => {
  const matching = matchingDB().create({
    users,
    schedule,
    active: true,
  });
  await matchingDB().save(matching);
  for await (const user of users) {
    user.matches.forEach(matching => {
      // Set past matches to false
      matching.active = false;
    });
    user.matches.push(matching);
    await userDB().save(user);
  }
  await matchingDB().save(matching);
  return matching;
};

export default {
  createDaySchedule,
  createMatching,
  createTime,
};
