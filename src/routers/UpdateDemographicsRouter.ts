import { Request } from 'express';
import CornellMajorRepo from '../repos/CornellMajorRepo';
import UserRepo from '../repos/UserRepo';
import AuthenticatedAppplicationRouter from '../utils/AuthenticatedApplicationRouter';

class UpdateDemographicsRouter extends AuthenticatedAppplicationRouter<void> {
  constructor() {
    super('POST');
  }

  getPath(): string {
    return '/demographics/';
  }

  async content(req: Request): Promise<void> {
    const { user, body } = req;

    const validFields = ['graduationYear', 'hometown', 'major', 'profilePictureURL', 'pronouns'];

    /* sanitize fields */
    Object.keys(body).forEach((key) => {
      if (!validFields.includes(key)) {
        throw Error(`Invalid field '${key}' identified in request body.`);
      }
    });

    const { graduationYear, major } = body;
    if (graduationYear && Number.isNaN(graduationYear)) {
      throw Error('graduationYear must be a valid string containing a year.');
    }

    if (major) {
      const majorEntity = await CornellMajorRepo.getCornellMajorByName(major);
      if (!majorEntity) throw Error(`Major '${major}' doesn't exist.`);
      body.major = majorEntity;
    }

    await UserRepo.updateUser(user, body);
  }
}

export default new UpdateDemographicsRouter().router;
