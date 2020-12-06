// General utility functions / Objects helpful in a TS setting across
// all AppDev projects

import { URL } from 'url';
import Match from '../entities/Match';
import Constants from '../common/constants';

/**
 * Check if a string is an AppDev-formatted URL. An AppDev formatted URL is
 * either just a '/', or begins and ends with a `/`, and must have some
 * characters in between.
 */
const tryCheckAppDevURL = (path: string): void => {
  if (path !== '/' && path.length < 2) {
    throw Error('Invalid path');
  } else if (path[0] !== '/') {
    throw Error("Path must start with a '/'");
  } else if (path[path.length - 1] !== '/') {
    throw Error("Path must end with a '/'");
  }
};

/**
 * Extracts netID from email
 * @function
 * @param {string} email - Email to extract netid from
 * @return {string} netID from email
 */
const netIDFromEmail = (email: string): string => email.substring(0, email.indexOf('@'));

/**
 * Generates random alphanumeric string
 * @function
 * @param {number} length - Desired length of random code
 * @return {string} Randomly generated code
 */
const randomCode = (length: number): string =>
  Math.round(36 ** (length + 1) - Math.random() * 36 ** length)
    .toString(36)
    .slice(1)
    .toUpperCase();

/**
 * Validates a possible url
 * @function
 * @param {string} url - URL to validate
 * @returns {boolean} true if URL is valid, false otherwise
 *
 * @example validateURL("google") => false
 * @example validateURL("https://google.com") => true
 */
const validateURL = (url: string): boolean => {
  try {
    // eslint-disable-next-line no-new
    new URL(url);
    return true;
  } catch (err) {
    return false;
  }
};

/* Sort matches by meetingTime in descending order */
const sortMatchByMeetingTime = (x: Match, y: Match) => {
  const timeX = x.meetingTime;
  const timeY = y.meetingTime;

  if (!timeX) return 1;
  if (!timeY) return -1;
  if (!timeX && !timeY) return 0;
  return timeY.getTime() - timeX.getTime();
};

/* Checks whether match is a weekly match or not */
const isWeeklyMatch = (match: Match) => {
  return match.status !== Constants.MATCH_INACTIVE && match.status !== Constants.MATCH_CANCELED;
};

export default {
  isWeeklyMatch,
  netIDFromEmail,
  randomCode,
  sortMatchByMeetingTime,
  tryCheckAppDevURL,
  validateURL,
};
