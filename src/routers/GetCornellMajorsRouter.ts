import { Request } from 'express';
import { SerializedCornellMajor } from '../common/types';
import ApplicationRouter from '../utils/ApplicationRouter';
import Authenticate from '../utils/Authenticate';
import CornellMajorRepo from '../repos/CornellMajorRepo';

class GetCornellMajorsRouter extends ApplicationRouter<
  SerializedCornellMajor[]
> {
  constructor() {
    super('GET');
  }

  getPath(): string {
    return '/majors/';
  }
    
  middleware() {
    return [Authenticate.ensureAuthenticated];
  }

  async content(req: Request): Promise<SerializedCornellMajor[]> {
    const majors = await CornellMajorRepo.getCornellMajors();
    return majors.map(majorObject => majorObject.serialize());
  }
}

export default new GetCornellMajorsRouter().router;
