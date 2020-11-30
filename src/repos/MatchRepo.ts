import { getConnectionManager, Repository } from 'typeorm';
import Constants from '../common/constants';
import { MatchUpdateFields } from '../common/types';
import Match from '../entities/Match';
import User from '../entities/User';
import UserRepo from './UserRepo';

const db = (): Repository<Match> => getConnectionManager().get().getRepository(Match);

const isWeeklyMatch = (match: Match) => {
  return match.status !== Constants.MATCH_INACTIVE && match.status !== Constants.MATCH_CANCELED;
};

/* Sort matches by meetingTime in descending order */
const sortMatchByMeetingTime = (x: Match, y: Match) => {
  return y.meetingTime.getTime() - x.meetingTime.getTime();
};

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

const getWeeklyMatchesByNetID = async (netID: string): Promise<Match[]> => {
  const user = await UserRepo.getUserByNetID(netID);
  if (user && user.matches) return user.matches.filter(isWeeklyMatch).sort(sortMatchByMeetingTime);
  return [];
};

const getWeeklyMatches = async (): Promise<Match[]> => {
  const matches = await db().find({ relations: ['users', 'availabilities'] });
  return matches ? matches.filter(isWeeklyMatch).sort(sortMatchByMeetingTime) : [];
};

const getMatchHistoryByNetID = async (netID: string): Promise<Match[]> => {
  const user = await UserRepo.getUserByNetID(netID);
  if (user && user.matches) return user.matches.sort(sortMatchByMeetingTime);
  return [];
};

const getMatchHistory = async (): Promise<Match[]> => {
  const matches = await db().find({ relations: ['users', 'availabilities'] });
  return matches ? matches.sort(sortMatchByMeetingTime) : [];
};

const updateMatch = async (match: Match, matchFields: MatchUpdateFields): Promise<boolean> => {
  db().merge(match, matchFields);
  await db().save(match);
  return true;
};

export default {
  createMatch,
  getWeeklyMatchesByNetID,
  getWeeklyMatches,
  getMatchHistoryByNetID,
  getMatchHistory,
  updateMatch,
};
