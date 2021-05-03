import { Request } from 'express';
import Fuse from 'fuse.js';
import { SerializedCommunityUser } from '../common/types';
import AuthenticatedApplicationRouter from '../utils/AuthenticatedApplicationRouter';
import UserRepo from '../repos/UserRepo';

class SearchUsersRouter extends AuthenticatedApplicationRouter<SerializedCommunityUser[]> {
  constructor() {
    super('GET');
  }

  getPath(): string {
    return '/search/';
  }

  async content(req: Request): Promise<SerializedCommunityUser[]> {
    const { query } = req.query;
    if (!query) throw Error('No search query provided');

    const users = await UserRepo.getUsers(['groups', 'interests', 'major']);
    const options = {
      keys: ['firstName', 'lastName', 'netID'],
    };
    const fuse = new Fuse(
      users.map((userObject) => userObject.communitySerialize()),
      options,
    );
    return fuse.search(query).map((fuseResult) => fuseResult.item);
  }
}

export default new SearchUsersRouter().router;
