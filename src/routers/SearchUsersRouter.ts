import { Request } from 'express';
import { SerializedUser } from '../common/types';
import AuthenticatedAppplicationRouter from '../utils/AuthenticatedApplicationRouter';
import UserRepo from '../repos/UserRepo';
import Fuse from 'fuse.js';
type FuseResult<T> = Fuse.FuseResult<T>;

class SearchUsersRouter extends AuthenticatedAppplicationRouter<SerializedUser[]> {
  constructor() {
    super('GET');
  }

  getPath(): string {
    return '/search/';
  }

  async content(req: Request): Promise<SerializedUser[]> {
    const { query } = req.query
    if (!query) throw Error("No search query provided");

    const users = await UserRepo.getUsers();
    const options = {
      keys: [
        "firstName",
        "lastName",
        "netID"
      ]
    }
    const fuse = new Fuse(users.map(userObject => userObject.serialize()), options)
    return fuse.search(query).map(fuseResult => fuseResult.item)
  }
}

export default new SearchUsersRouter().router;