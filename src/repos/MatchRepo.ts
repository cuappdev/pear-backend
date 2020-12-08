import { getConnectionManager, Repository } from 'typeorm';
import Constants from '../common/constants';
import { MatchUpdateFields } from '../common/types';
import Match from '../entities/Match';
import User from '../entities/User';
import UserRepo from './UserRepo';
import AppDevUtils from '../utils/AppDevUtils';

const db = (): Repository<Match> => getConnectionManager().get().getRepository(Match);

const createMatch = async (users: User[]): Promise<boolean> => {
  if (users.length < 2) return false;
  const match = db().create({
    users,
    status: Constants.MATCH_CREATED,
  });
  await db().save(match);
  return true;
};

const getMatchByID = async (id: string): Promise<Match> => {
  const match = await db().findOne(id);
  if (!match) throw Error(`Match with id: '${id}' doesn't exist in the database.`);
  return match;
};

const getWeeklyMatchesByNetID = async (netID: string): Promise<Match[]> => {
  const user = await UserRepo.getUserByNetID(netID);
  if (!user) throw Error(`User with netID: '${netID}' doesn't exist in the database.`);
  return user.matches
    ? user.matches.filter(AppDevUtils.isWeeklyMatch).sort(AppDevUtils.sortMatchByMeetingTime)
    : [];
};

const getWeeklyMatches = async (): Promise<Match[]> => {
  const matches = await db().find({ relations: ['users', 'availabilities'] });
  return matches
    ? matches.filter(AppDevUtils.isWeeklyMatch).sort(AppDevUtils.sortMatchByMeetingTime)
    : [];
};

const getMatchHistoryByNetID = async (netID: string): Promise<Match[]> => {
  const user = await UserRepo.getUserByNetID(netID);
  if (!user) throw Error(`User with netID: '${netID}' doesn't exist in the database.`);
  return user.matches ? user.matches.sort(AppDevUtils.sortMatchByMeetingTime) : [];
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
  getMatchByID,
  getWeeklyMatchesByNetID,
  getWeeklyMatches,
  getMatchHistoryByNetID,
  getMatchHistory,
  updateMatch,
};
