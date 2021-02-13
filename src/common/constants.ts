// ASSETS

const ASSET_SPLITTER = '|';

// AVAILABILITIES

const VALID_DAYS = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];

const VALID_TIMES = [
  9,
  9.5,
  10,
  10.5,
  11,
  11.5,
  12,
  12.5,
  13,
  13.5,
  14,
  14.5,
  15,
  15.5,
  16,
  16.5,
  17,
  17.5,
  18,
  18.5,
  19,
  19.5,
  20,
  20.5,
];

// CORNELL MAJORS

const UNDECLARED_MAJOR = 'Undeclared';

// ENVIRONMENT TYPE

// Uses SSL
const IS_PRODUCTION = process.env.NODE_PROD_ENV === 'true';
// Allows access to dev routes
const IS_DEVELOPMENT = process.env.NODE_DEV_ENV === 'true';

// GOALS

const JUST_CHATTING = 'Just chatting';
const FINDING_MY_PEOPLE = 'Finding my people';
const MEETING_SOMEONE_DIFFERENT = 'Meeting someone different';
const LEARNING_FROM_MENTORS = 'Learning from mentors';
const GUIDING_MENTEES = 'Guiding mentees';
const GOALS = [
  JUST_CHATTING,
  FINDING_MY_PEOPLE,
  MEETING_SOMEONE_DIFFERENT,
  LEARNING_FROM_MENTORS,
  GUIDING_MENTEES,
];

// MATCHING

const MATCH_CREATED = 'created';
const MATCH_PROPOSED = 'proposed';
const MATCH_CANCELED = 'canceled';
const MATCH_ACTIVE = 'active';
const MATCH_INACTIVE = 'inactive';

export default {
  ASSET_SPLITTER,
  VALID_DAYS,
  VALID_TIMES,
  UNDECLARED_MAJOR,
  IS_PRODUCTION,
  IS_DEVELOPMENT,
  FINDING_MY_PEOPLE,
  MEETING_SOMEONE_DIFFERENT,
  GOALS,
  MATCH_CREATED,
  MATCH_PROPOSED,
  MATCH_CANCELED,
  MATCH_ACTIVE,
  MATCH_INACTIVE,
};
