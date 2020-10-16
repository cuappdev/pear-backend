// General utility functions / Objects helpful in a TS setting across
// all AppDev projects

/**
 * Check if a string is an AppDev-formatted URL. An AppDev formatted URL is
 * either just a '/', or begins and ends with a `/`, and must have some
 * characters in between.
 */
const tryCheckAppDevURL = (path: string) => {
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
const netIDFromEmail = (email: string): string =>
  email.substring(0, email.indexOf('@'));

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
 * https://stackoverflow.com/questions/5717093/check-if-a-javascript-string-is-a-url/49849482
*/
const validateURL = (url: string): boolean => {
  const pattern = new RegExp('^(https?:\\/\\/)?' + // protocol
    '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // domain name
    '((\\d{1,3}\\.){3}\\d{1,3}))' + // OR ip (v4) address
    '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // port and path
    '(\\?[;&a-z\\d%_.~+=-]*)?' + // query string
    '(\\#[-a-z\\d_]*)?$', 'i'); // fragment locator
  return !!pattern.test(url);
};

export default {
  netIDFromEmail,
  randomCode,
  tryCheckAppDevURL,
  validateURL,
};
