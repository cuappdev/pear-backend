import { getConnectionManager, Repository } from 'typeorm';
import User from '../entities/User';

const db = (): Repository<User> => getConnectionManager().get().getRepository(User);

const createUser = async (
  netID: string,
  googleID: string,
  firstName: string,
  lastName: string,
): Promise<User> => {
  if (!(netID && googleID && firstName && lastName)) {
    throw Error('Invalid parameters');
  }
  const possible_user = await db().findOne({ netID });
  if (!(possible_user == null)) {
    throw Error('User with that netID already exists')
  }
  const user = db().create({
    netID,
    googleID,
    firstName,
    lastName,
  });
  await db().save(user);
  return user;
};

const deleteUser = async (
  netID: string
): Promise<Boolean> => {
  if (!(netID)) {
    throw Error('Invalid parameter');
  }
  await db()
    .createQueryBuilder()
    .delete()
    .from(User)
    .where("netID = :netID", { netID: netID })
    .execute()
    .then(dr => {
      if (dr.affected == 0) {
        throw Error('User does not exist')
      }
    }
    )
    .catch(e => {
      throw Error('Unable to execute sql')
    }
    )
  return true
};

const updateUser = async (
  currentNetID: string,
  firstName: string,
  netID: string,
  lastName: string
): Promise<Boolean> => {
  await db()
    .createQueryBuilder()
    .update(User)
    .set({
      firstName: firstName,
      netID: netID,
      lastName: lastName
    })
    .where("netID = :netID", { netID: currentNetID })
    .execute()
    .then(ur => {
      if (ur.affected == 0) {
        throw Error('User does not exist')
      }
    }
    )
    .catch(e => {
      throw Error('Unable to execute sql')
    }
    )
  return true
};

const getUserByNetID = async (netID: string): Promise<User> => {
  const user = await db().findOne({ netID });
  if (user == null) {
    throw Error('User with that netID does not exist')
  }
  return user
};

export default {
  createUser,
  deleteUser,
  getUserByNetID,
  updateUser
};