import { getConnectionManager, Repository } from 'typeorm';
import TalkingPoint from '../entities/TalkingPoint';

const db = (): Repository<TalkingPoint> => getConnectionManager().get().getRepository(TalkingPoint);

const createTalkingPoint = async (name: string): Promise<void> => {
  const possibleTalkingPoint = await db().findOne({ name });
  if (!possibleTalkingPoint) {
    const talkingPoint = db().create({ name });
    await db().save(talkingPoint);
  }
};

const getTalkingPointByName = async (name: string): Promise<TalkingPoint | undefined> => {
  const talkingPoint = await db().findOne({ where: { name } });
  return talkingPoint;
};

const getTalkingPoints = async (): Promise<TalkingPoint[]> => {
  return db().find();
};

export default {
  createTalkingPoint,
  getTalkingPointByName,
  getTalkingPoints,
};
