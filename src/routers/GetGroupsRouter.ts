import { Request } from 'express';
import { SerializedGroup } from '../common/types';
import AuthenticatedApplicationRouter from '../utils/AuthenticatedApplicationRouter';
import GroupRepo from '../repos/GroupRepo';

class GetGroupsRouter extends AuthenticatedApplicationRouter<SerializedGroup[]> {
  constructor() {
    super('GET');
  }

  getPath(): string {
    return '/all/';
  }

  async content(req: Request): Promise<SerializedGroup[]> {
    const groups = await GroupRepo.getGroups();
    return groups.map((group) => group.serialize());
  }
}

export default new GetGroupsRouter().router;
