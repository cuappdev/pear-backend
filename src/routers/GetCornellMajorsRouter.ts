import { Request } from 'express';
import { SerializedCornellMajor } from '../common/types';
import AuthenticatedApplicationRouter from '../utils/AuthenticatedApplicationRouter';
import CornellMajorRepo from '../repos/CornellMajorRepo';

class GetCornellMajorsRouter extends AuthenticatedApplicationRouter<SerializedCornellMajor[]> {
  constructor() {
    super('GET');
  }

  getPath(): string {
    return '/all/';
  }

  async content(req: Request): Promise<SerializedCornellMajor[]> {
    const majors = await CornellMajorRepo.getCornellMajors();
    return majors.map((major) => major.serialize());
  }
}

export default new GetCornellMajorsRouter().router;
