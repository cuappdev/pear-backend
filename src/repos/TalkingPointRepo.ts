import { getConnectionManager, Repository } from 'typeorm';
import TalkingPoint from '../entities/TalkingPoint';
import UserRepo from './UserRepo';

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

const getTalkingPointsByNetID = async (netID: string): Promise<TalkingPoint[]> => {
  const user = await UserRepo.getUserByNetID(netID);
  if (!user) throw Error(`User with netID: '${netID}' doesn't exist in the database.`);
  return user.talkingPoints;
};

const getTalkingPoints = async (): Promise<TalkingPoint[]> => {
  return db().find();
};

export default {
  createTalkingPoint,
  getTalkingPointByName,
  getTalkingPointsByNetID,
  getTalkingPoints,
};
