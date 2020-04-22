import { Request } from 'express';
import { SerializedCornellMajor } from '../common/types';
import ApplicationRouter from '../utils/ApplicationRouter';
import CornellMajor from '../entities/CornellMajor';
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

  async content(req: Request): Promise<SerializedCornellMajor[]> {
    const callback = (
      accum: SerializedCornellMajor[],
      currentVal: CornellMajor
    ) => {
      accum.push(currentVal.serialize());
      return accum;
    };
    const majors = await CornellMajorRepo.getCornellMajors();
    return majors.reduce(callback, []);
  }
}

export default new GetCornellMajorsRouter().router;
