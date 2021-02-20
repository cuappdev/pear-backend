import { Request } from 'express';
import { SerializedGroup } from '../common/types';
import AuthenticatedApplicationRouter from '../utils/AuthenticatedApplicationRouter';
import GroupRepo from '../repos/GroupRepo';

class GetUserGroupsRouter extends AuthenticatedApplicationRouter<SerializedGroup[]> {
  constructor() {
    super('GET');
  }

  getPath(): string {
    return '/groups';
  }

  async content(req: Request): Promise<SerializedGroup[]> {
    const { netID } = req.query;
    const groups = await GroupRepo.getGroupsByNetID(netID || req.user.netID);
    return groups.map((group) => group.serialize());
  }
}

export default new GetUserGroupsRouter().router;
