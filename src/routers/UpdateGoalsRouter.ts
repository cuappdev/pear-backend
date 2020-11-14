import { Request } from 'express';
import Goal from '../entities/Goal';
import GoalRepo from '../repos/GoalRepo';
import UserRepo from '../repos/UserRepo';
import AuthenticatedApplicationRouter from '../utils/AuthenticatedApplicationRouter';
import LogUtils from '../utils/LogUtils';

class UpdateGoalsRouter extends AuthenticatedApplicationRouter<void> {
  constructor() {
    super('POST');
  }

  getPath(): string {
    return '/goals/';
  }

  async content(req: Request): Promise<void> {
    const { user, body } = req;
    const { goals } = body;

    if (!goals) {
      throw Error("Field 'goals' is missing in the request body.");
    }

    const goalList = await goals.reduce(async (filteredGoals: Promise<Goal[]>, name: string) => {
      const collection = await filteredGoals;
      const goal = await GoalRepo.getGoalByName(name);

      if (goal) collection.push(goal);
      else {
        LogUtils.logErr(`Goal '${name}' doesn't exist in the database.`);
      }

      return collection;
    }, Promise.resolve([]));

    await UserRepo.updateUser(user, { goals: goalList });
  }
}

export default new UpdateGoalsRouter().router;
