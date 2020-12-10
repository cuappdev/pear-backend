import { getConnectionManager, Repository } from 'typeorm';
import Goal from '../entities/Goal';

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

const getGoals = async (): Promise<Goal[]> => {
  return db().find();
};

export default {
  createGoal,
  getGoalByName,
  getGoals,
};
