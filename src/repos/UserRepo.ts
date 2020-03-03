import { getConnectionManager, Repository } from 'typeorm';
import User from '../entities/User';

const db = (): Repository<User> =>
  getConnectionManager()
    .get()
    .getRepository(User);

const createUser = async (
  firstName: string,
  googleID: string,
  lastName: string,
  netID: string
): Promise<User> => {
  if (!(firstName && googleID && lastName && netID)) {
    throw Error('Invalid parameters');
  }
  const possibleUser = await db().findOne({ netID });
  if (possibleUser) {
    throw Error('User with that netID already exists');
  }
  const user = db().create({
    firstName,
    googleID,
    lastName,
    netID,
  });
  await db().save(user);
  return user;
};

const deleteUser = async (netID: string): Promise<boolean> => {
  if (!netID) {
    throw Error('Invalid parameter');
  }
  await db()
    .createQueryBuilder()
    .delete()
    .from(User)
    .where('netID = :netID', { netID })
    .execute()
    .then(dr => {
      if (dr.affected === 0) {
        throw Error('User does not exist');
      }
    })
    .catch(e => {
      throw Error('Unable to execute sql');
    });
  return true;
};

const updateUser = async (
  currentNetID: string,
  firstName: string,
  lastName: string,
  netID: string
): Promise<boolean> => {
  const possibleUser = await db().findOne({ netID });
  if (possibleUser) {
    throw Error('User with that netID already exists');
  }
  await db()
    .createQueryBuilder()
    .update(User)
    .set({
      firstName,
      lastName,
      netID,
    })
    .where('netID = :netID', { netID: currentNetID })
    .execute()
    .then(ur => {
      if (ur.affected === 0) {
        throw Error('User does not exist');
      }
    })
    .catch(e => {
      throw Error('Unable to execute sql');
    });
  return true;
};

const getUserByNetID = async (netID: string): Promise<User> => {
  const user = await db().findOne({ netID });
  if (user) {
    return user;
  } else {
    throw Error('User with that netID does not exist');
  }
};

export default {
  createUser,
  deleteUser,
  getUserByNetID,
  updateUser
};
