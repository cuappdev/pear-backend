import { getConnectionManager, Repository } from 'typeorm';
import Constants from '../common/constants';
import { MatchUpdateFields } from '../common/types';
import Match from '../entities/Match';
import User from '../entities/User';
import UserRepo from './UserRepo';

const db = (): Repository<Match> => getConnectionManager().get().getRepository(Match);

const createMatch = async (users: User[]): Promise<void> => {
  const possibleMatch = await db().findOne({ where: { users } });
  if (!possibleMatch) {
    const match = db().create({
      status: Constants.MATCH_CREATED,
      users: [],
    });
    await db().save(match);
  }
};

const getMatchByNetID = async (netID: string): Promise<Match | undefined> => {
  const user = await UserRepo.getUserByNetID(netID);
  return user.match;
};

const getMatches = async (): Promise<Match[]> => {
  return db().find({ relations: ['users', 'availabilities'] });
};

const updateMatch = async (match: Match, matchFields: MatchUpdateFields): Promise<boolean> => {
  db().merge(match, matchFields);
  await db().save(match);
  return true;
};

export default {
  createMatch,
  getMatchByNetID,
  getMatches,
  updateMatch,
};
