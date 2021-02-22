import { Request } from 'express';
import { SerializedGoal } from '../common/types';
import AuthenticatedApplicationRouter from '../utils/AuthenticatedApplicationRouter';
import GoalRepo from '../repos/GoalRepo';

class GetUserGoalsRouter extends AuthenticatedApplicationRouter<SerializedGoal[]> {
  constructor() {
    super('GET');
  }

  getPath(): string {
    return '/goals';
  }

  async content(req: Request): Promise<SerializedGoal[]> {
    const { netID } = req.query;
    const goals = await GoalRepo.getGoalsByNetID(netID || req.user.netID);
    return goals.map((goal) => goal.serialize());
  }
}

export default new GetUserGoalsRouter().router;
