import { getConnectionManager, Repository } from 'typeorm';
import User from '../entities/User';

const db = (): Repository<User> => getConnectionManager().get().getRepository(User);

const createUser = async (
  firstName: string,
  googleID: string,
  lastName: string,
  netID: string
): Promise<User> => {
  if (!(firstName && googleID && lastName && netID)) {
    throw Error('Invalid parameters');
  }
  const possible_user = await db().findOne({ netID });
  if (possible_user) {
    throw Error('User with that netID already exists');
  }
  const user = db().create({
    firstName: firstName,
    googleID: googleID,
    lastName: lastName,
    netID: netID,
    matches: []
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
        throw Error('User does not exist');
      }
    }
    )
    .catch(e => {
      throw Error('Unable to execute sql');
    }
    )
  return true;
};

const updateUser = async (
  currentNetID: string,
  firstName: string,
  lastName: string,
  netID: string
): Promise<Boolean> => {
  const possible_user = await db().findOne({ netID });
  if (possible_user) {
    throw Error('User with that netID already exists');
  }
  await db()
    .createQueryBuilder()
    .update(User)
    .set({
      firstName: firstName,
      lastName: lastName,
      netID: netID
    })
    .where("netID = :netID", { netID: currentNetID })
    .execute()
    .then(ur => {
      if (ur.affected == 0) {
        throw Error('User does not exist');
      }
    }
    )
    .catch(e => {
      throw Error('Unable to execute sql');
    }
    )
  return true;
};

const getUserByNetID = async (netID: string): Promise<User> => {
  const user = await db().findOne({
    where: { netID: netID }, relations: ["matches", "matches.users",
      "matches.schedule", "matches.schedule.times"]
  });
  if (!(user)) {
    throw Error('User with that netID does not exist');
  }
  return user;
};

export default {
  createUser,
  deleteUser,
  getUserByNetID,
  updateUser
};