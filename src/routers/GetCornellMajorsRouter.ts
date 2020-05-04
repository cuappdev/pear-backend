import { Request } from 'express';
import { SerializedCornellMajor } from '../common/types';
import AuthenticatedAppplicationRouter from '../utils/AuthenticatedApplicationRouter';
import CornellMajorRepo from '../repos/CornellMajorRepo';

class GetCornellMajorsRouter extends AuthenticatedAppplicationRouter<
  SerializedCornellMajor[]
> {
  constructor() {
    super('GET');
  }

  getPath(): string {
    return '/majors/';
  }

  async content(req: Request): Promise<SerializedCornellMajor[]> {
    const majors = await CornellMajorRepo.getCornellMajors();
    return majors.map(majorObject => majorObject.serialize());
  }
}

export default new GetCornellMajorsRouter().router;
