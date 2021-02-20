import { getConnectionManager, Repository } from 'typeorm';
import Goal from '../entities/Goal';
import UserRepo from './UserRepo';

const db = (): Repository<Goal> => getConnectionManager().get().getRepository(Goal);

const createGoal = async (name: string): Promise<void> => {
  const possibleGoal = await db().findOne({ name });
  if (!possibleGoal) {
    const goal = db().create({ name });
    await db().save(goal);
  }
};

const getGoalByName = async (name: string): Promise<Goal | undefined> => {
  const goal = await db().findOne({ where: { name } });
  return goal;
};

const getGoalsByNetID = async (netID: string): Promise<Goal[]> => {
  const user = await UserRepo.getUserByNetID(netID);
  if (!user) throw Error(`User with netID: '${netID}' doesn't exist in the database.`);
  return user.goals;
};

const getGoals = async (): Promise<Goal[]> => {
  return db().find();
};

export default {
  createGoal,
  getGoalByName,
  getGoalsByNetID,
  getGoals,
};
