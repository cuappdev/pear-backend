import { Request } from 'express';
import Group from '../entities/Group';
import GroupRepo from '../repos/GroupRepo';
import UserRepo from '../repos/UserRepo';
import AuthenticatedApplicationRouter from '../utils/AuthenticatedApplicationRouter';
import LogUtils from '../utils/LogUtils';

class UpdateGroupsRouter extends AuthenticatedApplicationRouter<void> {
  constructor() {
    super('POST');
  }

  getPath(): string {
    return '/groups/';
  }

  async content(req: Request): Promise<void> {
    const { user, body } = req;
    const { groups } = body;

    if (!groups) {
      throw Error("Field 'groups' is missing in the request body.");
    }

    const groupList = await groups.reduce(
      async (filteredGroups: Promise<Group[]>, name: string) => {
        const collection = await filteredGroups;
        const group = await GroupRepo.getGroupByName(name);

        if (group) collection.push(group);
        else {
          LogUtils.logErr(`Organization '${name}' doesn't exist in the database.`);
        }

        return collection;
      },
      Promise.resolve([]),
    );

    await UserRepo.updateUser(user, { groups: groupList });
  }
}

export default new UpdateGroupsRouter().router;
