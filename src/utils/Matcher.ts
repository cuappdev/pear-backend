import Constants from '../common/constants';
import MatchRepo from '../repos/MatchRepo';
import UserRepo from '../repos/UserRepo';
import User from '../entities/User';

// MATCHER CONSTANTS

const AVAILABILITY_SCORE_MAX = 20;
const MAJOR_SCORE_MAX = 20;
const INTEREST_SCORE_MAX = 20;
const GROUP_SCORE_MAX = 20;
const TALKING_POINTS_SCORE_MAX = 20;

// PREVIOUS WEEK FUNCTIONS

async function finalizeMatchStatuses() {
  const previousWeeksMatches = await MatchRepo.getWeeklyMatches();
  previousWeeksMatches.forEach((match) => {
    const status =
      match.status === Constants.MATCH_ACTIVE ? Constants.MATCH_INACTIVE : Constants.MATCH_CANCELED;
    MatchRepo.updateMatch(match, { status });
  });
}

// SIMILARITY FUNCTIONS

const calculateSimilarity = (chooserItems: any[], choiceItems: any[]) => {
  let similarity = 0;
  chooserItems.forEach((item) => {
    similarity += item in choiceItems ? 1 : 0;
  });
  return chooserItems.length / similarity;
};

function generalListScorer(chooser: User, choice: User, property: string, max: number) {
  let score = max;
  let similarity;
  if (Constants.FINDING_MY_PEOPLE in chooser.goals) {
    similarity = calculateSimilarity(chooser[property], choice[property]);
    score -= (max / 2) * (1 - similarity);
  }
  if (Constants.MEETING_SOMEONE_DIFFERENT in chooser.goals) {
    const similarityValue = similarity || calculateSimilarity(chooser[property], choice[property]);
    score -= (max / 2) * similarityValue;
  }
  return score;
}

function availabilityScorer(chooser: User, choice: User) {
  if (chooser.availabilities.length === 0) return 0;
  let similarity = 0;
  chooser.availabilities.forEach((chooserAvailability) => {
    let currentSimilarity = 1;
    choice.availabilities.forEach((choiceAvailability) => {
      if (chooserAvailability.day === choiceAvailability.day) {
        currentSimilarity = calculateSimilarity(
          chooserAvailability.times,
          choiceAvailability.times,
        );
      }
    });
    similarity += currentSimilarity;
  });
  return (AVAILABILITY_SCORE_MAX * similarity) / chooser.availabilities.length;
}

function majorScorer(chooser: User, choice: User) {
  let score = MAJOR_SCORE_MAX;
  if (Constants.FINDING_MY_PEOPLE in chooser.goals) {
    score -= chooser.major !== choice.major ? MAJOR_SCORE_MAX / 2 : 0;
  }
  if (Constants.MEETING_SOMEONE_DIFFERENT in chooser.goals) {
    score -= chooser.major === choice.major ? MAJOR_SCORE_MAX / 2 : 0;
  }
  return score;
}

function interestScorer(chooser: User, choice: User) {
  return generalListScorer(chooser, choice, 'interests', INTEREST_SCORE_MAX);
}

function groupScorer(chooser: User, choice: User) {
  return generalListScorer(chooser, choice, 'groups', GROUP_SCORE_MAX);
}

function talkingPointsScorer(chooser: User, choice: User) {
  return generalListScorer(chooser, choice, 'talkingPoints', TALKING_POINTS_SCORE_MAX);
}

// MATCHING FUNCTIONS

async function createUserPreferences(): Promise<Record<string, User[]>> {
  const users = await UserRepo.getUsers();
  const preferences = {};
  users.forEach((choosingUser) => {
    const scoreData = [];
    users.forEach((choiceUser) => {
      // Score each choiceUser based on choosingUser's goals
      if (choosingUser !== choiceUser) {
        const scorers = [
          availabilityScorer,
          majorScorer,
          interestScorer,
          groupScorer,
          talkingPointsScorer,
        ];
        const score = scorers
          .map((scorer) => scorer(choosingUser, choiceUser))
          .reduce((a, b) => {
            return a + b;
          }, 0);
        scoreData.push([choosingUser, score]);
      }
    });
    // Convert scoresInfo list to list of users in order of descending score
    const sortedUsers = scoreData.sort((scoreDataA, scoreDataB) => {
      return scoreDataB[1] - scoreDataA[1];
    });
    preferences[choosingUser.netID] = sortedUsers.map((scoreDatum) => {
      return scoreDatum[0];
    });
  });
  return preferences;
}

async function matchUsers(preferences: Record<string, User[]>) {
  // TODO: Match w/ SRP - for now, random pairing
  let user1; // should be null after reduction - otherwise we have an odd number of users and one is unmatched
  Object.keys(preferences).forEach(async (netID) => {
    if (user1) {
      const user2 = await UserRepo.getUserByNetID(netID);
      MatchRepo.createMatch([user1, user2]);
      user1 = null;
    } else {
      user1 = await UserRepo.getUserByNetID(netID);
    }
  });
}

async function matcher() {
  // Set previous week's active matches to inactive and all other non-inactive matches to cancelled
  finalizeMatchStatuses();
  // Create users' preference lists
  const preferences = await createUserPreferences();
  // Match users w/ SRP ( https://uvacs2102.github.io/docs/roomates.pdf )
  matchUsers(preferences);
}

export default matcher;
