import { getConnectionManager, Repository } from 'typeorm';
import Matching from '../entities/Matching';
import Time from '../entities/Time';
import { TimeEnum } from '../common/types';

const matchingDB = (): Repository<Matching> => getConnectionManager().get().getRepository(Matching);
const timeDB = (): Repository<Time> => getConnectionManager().get().getRepository(Time);

const createTime = async (
  time: number
): Promise<void> => {

  const possible_time = await timeDB().findOne({ time });
  if (possible_time == null) {
    const time_obj = timeDB().create({
      time
    });
    await timeDB().save(time_obj);
  }
};



export default {
  createTime
};