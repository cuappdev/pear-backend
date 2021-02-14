import util from 'util';
import Constants from '../common/constants';

/**
 * Write object to console, if in production, condense message
 *
 * @param obj
 * @param error
 */
function log(obj: any, error = false) {
  const options = {
    showHidden: false,
    depth: Infinity,
    colors: true,
    maxArrayLength: 10,
    breakLength: Infinity,
    compact: false,
  };

  if (Constants.IS_PRODUCTION) {
    options.compact = true;
    options.colors = false;
  }

  if (error) {
    console.error(util.inspect(obj, options));
  } else {
    console.log(util.inspect(obj, options));
  }
}

/**
 * Log error using log()
 *
 * @param error, the error object
 * @param data, data such as parameters or an object that would help in debugging
 * @param note, description of error
 * @param disableConsoleOut, disable console.out in development env, for tests
 * @returns {*}
 */
function logErr(error: any, data: any = {}, note = ''): any {
  try {
    // try block because if the error logging has an error
    if (!error) {
      return null;
    }

    const responseJSON = {
      time: Date.now(),
      error,
      data,
      note,
    };

    log(responseJSON, true);
    return responseJSON;
  } catch (e) {
    return error;
  }
}

export default {
  log,
  logErr,
};
