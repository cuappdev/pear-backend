/* eslint-disable no-await-in-loop */
import Constants from '../common/constants';
import MatchRepo from '../repos/MatchRepo';
import UserRepo from '../repos/UserRepo';
import User from '../entities/User';

// MATCHER CONSTANTS

const MAX_SCORE = {
  availabilities: 20,
  major: 20,
  interests: 20,
  groups: 20,
  talkingPoints: 20,
};

// PREVIOUS WEEK FUNCTIONS

/** Set previous week's active matches to inactive and all other non-inactive matches to canceled */
const finalizeMatchStatuses = async () => {
  const previousWeeksMatches = await MatchRepo.getWeeklyMatches();
  previousWeeksMatches.forEach((match) => {
    const status =
      match.status === Constants.MATCH_ACTIVE ? Constants.MATCH_INACTIVE : Constants.MATCH_CANCELED;
    MatchRepo.updateMatch(match, { status });
  });
};

// SIMILARITY FUNCTIONS

/**
 * @function
 * @param chooserItems - an array of items belonging to the user whose user preferences are being calculated
 * @param choiceItems - an array of items belonging to the user whose match score is being calculated
 * @return a fraction of the items the choser has in common with their choice over the chooser's total items
 */
const calculateSimilarity = (chooserItems: any[], choiceItems: any[]): number => {
  let similarity = 0;
  chooserItems.forEach((item) => {
    similarity += item in choiceItems ? 1 : 0;
  });
  return similarity / chooserItems.length;
};

/**
 * @function
 * @param chooser - the user whose user preferences are being calculated
 * @param choice - the user whose match score is being calculated
 * @param property - the matching property that is being used to calculate the match score
 * @return the score assigned to choice based on the matching property
 */
const generalSingleScorer = (chooser: User, choice: User, property: string): number => {
  let score = MAX_SCORE[property];
  if (Constants.FINDING_MY_PEOPLE in chooser.goals) {
    score -= chooser.major !== choice.major ? MAX_SCORE[property] / 2 : 0;
  }
  if (Constants.MEETING_SOMEONE_DIFFERENT in chooser.goals) {
    score -= chooser.major === choice.major ? MAX_SCORE[property] / 2 : 0;
  }
  return score;
};

/**
 * @function
 * @param chooser - the user whose user preferences are being calculated
 * @param choice - the user whose match score is being calculated
 * @param property - the matching property that is being used to calculate the match score
 * @return the score assigned to choice based on their similarities with chooser's matching property
 */
const generalListScorer = (chooser: User, choice: User, property: string): number => {
  let score = MAX_SCORE[property];
  let similarity;
  if (Constants.FINDING_MY_PEOPLE in chooser.goals) {
    similarity = calculateSimilarity(chooser[property], choice[property]);
    score -= (MAX_SCORE[property] / 2) * (1 - similarity);
  }
  if (Constants.MEETING_SOMEONE_DIFFERENT in chooser.goals) {
    const similarityValue = similarity || calculateSimilarity(chooser[property], choice[property]);
    score -= (MAX_SCORE[property] / 2) * similarityValue;
  }
  return score;
};

/**
 * @function
 * @param chooser - the user whose user preferences are being calculated
 * @param choice - the user whose match score is being calculated
 * @return the score assigned to choice based on their similarities with chooser's availabilities
 */
const availabilityScorer = (chooser: User, choice: User): number => {
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
  return (MAX_SCORE.availabilities * similarity) / chooser.availabilities.length;
};

/**
 * @function
 * @param chooser - the user whose user preferences are being calculated
 * @param choice - the user whose match score is being calculated
 * @return the score assigned to choice based on their similarities with chooser's major
 */
const majorScorer = (chooser: User, choice: User): number => {
  return generalSingleScorer(chooser, choice, 'major');
};

/**
 * @function
 * @param chooser - the user whose user preferences are being calculated
 * @param choice - the user whose match score is being calculated
 * @return the score assigned to choice based on their similarities with chooser's interests
 */
const interestScorer = (chooser: User, choice: User): number => {
  return generalListScorer(chooser, choice, 'interests');
};

/**
 * @function
 * @param chooser - the user whose user preferences are being calculated
 * @param choice - the user whose match score is being calculated
 * @return the score assigned to choice based on their similarities with chooser's groups
 */
const groupScorer = (chooser: User, choice: User): number => {
  return generalListScorer(chooser, choice, 'groups');
};

/**
 * @function
 * @param chooser - the user whose user preferences are being calculated
 * @param choice - the user whose match score is being calculated
 * @return the score assigned to choice based on their similarities with chooser's talking points
 */
const talkingPointsScorer = (chooser: User, choice: User): number => {
  return generalListScorer(chooser, choice, 'talkingPoints');
};

// MATCHING FUNCTIONS

/**
 * @function
 * @return a dictionary whose keys are user's netIDs and whose values are that user's user preference list
 */
const createUserPreferences = async (): Promise<Record<string, User[]>> => {
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
};

/** Match users w/ SRP ( https://uvacs2102.github.io/docs/roomates.pdf )
 * @function
 * @param preferences a dictionary whose keys are user's netIDs and whose values are that user's user preference list
 */
const matchUsers = async (preferences: Record<string, User[]>) => {
  // TODO: Match w/ SRP - for now, random pairing
  const netIDs = Object.keys(preferences);
  for (let i = 0; i < Math.floor(netIDs.length / 2); i++) {
    const user1 = await UserRepo.getUserByNetID(netIDs[i]);
    const user2 = await UserRepo.getUserByNetID(netIDs[i + 1]);
    await MatchRepo.createMatch([user1, user2]);
  }
};

/** Matches users */
const matcher = async () => {
  finalizeMatchStatuses();
  const preferences = await createUserPreferences();
  matchUsers(preferences);
};

export default matcher;
