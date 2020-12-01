import { getConnectionManager, Repository } from 'typeorm';
import Constants from '../common/constants';
import { MatchUpdateFields } from '../common/types';
import Match from '../entities/Match';
import User from '../entities/User';
import UserRepo from './UserRepo';
import AppDevUtils from '../utils/AppDevUtils';

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

const getActiveMatchesByNetID = async (netID: string): Promise<Match[]> => {
  const user = await UserRepo.getUserByNetID(netID);
  if (user && user.matches)
    return user.matches.filter(AppDevUtils.isWeeklyMatch).sort(AppDevUtils.sortMatchByMeetingTime);
  return [];
};

const getMatchHistoryByNetID = async (netID: string): Promise<Match[]> => {
  const user = await UserRepo.getUserByNetID(netID);
  if (user && user.matches) return user.matches.sort(AppDevUtils.sortMatchByMeetingTime);
  return [];
};

const getMatchHistory = async (): Promise<Match[]> => {
  const matches = await db().find({ relations: ['users', 'availabilities'] });
  return matches ? matches.sort(AppDevUtils.sortMatchByMeetingTime) : [];
};

const updateMatch = async (match: Match, matchFields: MatchUpdateFields): Promise<boolean> => {
  db().merge(match, matchFields);
  await db().save(match);
  return true;
};

export default {
  createMatch,
  getActiveMatchesByNetID,
  getMatchHistoryByNetID,
  getMatchHistory,
  updateMatch,
};
