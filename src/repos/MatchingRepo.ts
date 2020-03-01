import { getConnectionManager, Repository } from 'typeorm';
import Constants from '../common/constants';
import DaySchedule from '../entities/DaySchedule';
import Matching from '../entities/Matching';
import Time from '../entities/Time';
import User from '../entities/User';

const dayScheduleDB = (): Repository<DaySchedule> => getConnectionManager().get().getRepository(DaySchedule);
const matchingDB = (): Repository<Matching> => getConnectionManager().get().getRepository(Matching);
const timeDB = (): Repository<Time> => getConnectionManager().get().getRepository(Time);
const userDB = (): Repository<User> => getConnectionManager().get().getRepository(User);

const createTime = async (
  time: number
): Promise<void> => {
  if (!(Constants.VALID_TIMES.includes(time))) {
    throw Error('Invalid time');
  }
  const possible_time = await timeDB().findOne({ time });
  if (possible_time == null) {
    const time_obj = timeDB().create({
      time
    });
    await timeDB().save(time_obj);
  }
};

const createDaySchedule = async (
  day: string,
  times: [number]
): Promise<DaySchedule> => {
  if (!(Constants.VALID_DAYS.includes(day))) {
    throw Error('Invalid day');
  }
  const daySchedule = dayScheduleDB().create({ day });
  const callback = (accum, currentVal) => {
    if (!(Constants.VALID_TIMES.includes(currentVal))) {
      throw Error('Invalid time');
    }
    accum.push(new Time(currentVal));
    return accum;
  }
  daySchedule.times = times.reduce(callback, []);
  await dayScheduleDB().save(daySchedule);
  return daySchedule;
}

const createMatching = async (
  users: User[],
  schedule: DaySchedule[]
): Promise<Matching> => {
  const matching = matchingDB().create({
    users: users,
    schedule: schedule,
    active: true
  });
  await matchingDB().save(matching);
  users.forEach(async user => {
    if (typeof user.matchings !== 'undefined') {
      user.matchings.push(matching)
      user.matchings.forEach(matching => {
        matching.active = false
      });
    } else {
      user.matchings = [matching]
    }
    //console.log(user)
    await userDB().save(user)
    const user2 = await userDB()
      .createQueryBuilder("users")
      .leftJoinAndSelect("users.matchings", "matching")
      .getOne();
    console.log(user2)
  });
  return matching;
}


export default {
  createDaySchedule,
  createMatching,
  createTime,
};