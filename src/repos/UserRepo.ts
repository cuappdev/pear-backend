import { getConnectionManager, Repository } from 'typeorm';
import User from '../entities/User';

const db = (): Repository<User> => getConnectionManager().get().getRepository(User);

const createUser = async (
  netID: string,
  googleID: string,
  firstName: string,
  lastName: string,
): Promise<User> => {
  try {
    if (!(netID && googleID && firstName && lastName)) {
      throw Error();
    }
    const user = db().create({
      netID,
      googleID,
      firstName,
      lastName,
    });
    await db().save(user);
    return user;
  } catch (e) {
    throw Error('Unable to create user');
  }
};

const getUserByNetID = async (netID: string): Promise<User> => {
  try {
    return db().findOne({ netID });
  } catch (e) {
    throw Error('Unable to find user');
  }
};

export default {
  createUser,
  getUserByNetID,
};
