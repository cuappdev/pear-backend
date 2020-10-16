import { getConnectionManager, Repository } from 'typeorm';
import DaySchedule from '../entities/DaySchedule';
import Matching from '../entities/Matching';
import Time from '../entities/Time';
import User from '../entities/User';

const dayScheduleDB = (): Repository<DaySchedule> =>
  getConnectionManager().get().getRepository(DaySchedule);
const matchingDB = (): Repository<Matching> => getConnectionManager().get().getRepository(Matching);
const timeDB = (): Repository<Time> => getConnectionManager().get().getRepository(Time);
const userDB = (): Repository<User> => getConnectionManager().get().getRepository(User);

const createTime = async (time: number): Promise<void> => {
  const possibleTime = await timeDB().findOne({ time });
  if (!possibleTime) {
    const timeObj = timeDB().create({
      time,
    });
    await timeDB().save(timeObj);
  }
};

const createDaySchedule = async (day: string, times: number[]): Promise<DaySchedule> => {
  const daySchedule = dayScheduleDB().create({
    day,
    times: [],
  });
  for await (const time of times) {
    const timeObj = await timeDB().findOne({ time });
    if (!timeObj) throw Error('Internal error');
    daySchedule.times.push(timeObj);
    await timeDB().save(timeObj);
  }
  await dayScheduleDB().save(daySchedule);
  return daySchedule;
};

const createMatching = async (users: User[], schedule: DaySchedule[]): Promise<Matching> => {
  const matching = matchingDB().create({
    users,
    schedule,
    active: true,
  });
  await matchingDB().save(matching);
  for await (const user of users) {
    user.matches.forEach((match) => {
      // Set past matches to false
      match.active = false;
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
