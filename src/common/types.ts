import Availability from '../entities/Availability';
import Group from '../entities/Group';
import Interest from '../entities/Interest';
import CornellMajor from '../entities/CornellMajor';
import Goal from '../entities/Goal';

/* Represents a User */
export interface SerializedUser {
  googleID: string;
  firstName: string;
  lastName: string;
  netID: string;
  pronouns: string | null;
  graduationYear: string | null;
  major: SerializedCornellMajor | null;
  hometown: string | null;
  groups: SerializedGroup[];
  interests: SerializedInterest[];
  goals: SerializedGoal[];
  facebook: string | null;
  instagram: string | null;
  profilePictureURL: string | null;
  availabilities: SerializedAvailability[];
}

/* Represents a User without groups, interests, majors, or matches shown */
export interface SubSerializedUser {
  googleID: string;
  firstName: string;
  lastName: string;
  netID: string;
  pronouns: string | null;
  graduationYear: string | null;
  major: SerializedCornellMajor | null;
  hometown: string | null;
  facebook: string | null;
  instagram: string | null;
  profilePictureURL: string | null;
}

/* Represents a User session */
export interface SerializedUserSession {
  accessToken: string;
  active: boolean;
  refreshToken: string;
  sessionExpiration: string;
}

/* Represents an Availability */
export type SerializedAvailability = {
  day: string;
  times: number[];
  users: SubSerializedUser[];
};

/* Represents a Group */
export type SerializedGroup = string;

/* Represents a Cornell Major */
export type SerializedCornellMajor = string;

/* Represents an Interest */
export type SerializedInterest = string;

/* Represents a Goal */
export type SerializedGoal = string;

export interface UserUpdateFields {
  firstName?: string;
  lastName?: string;
  pronouns?: string;
  graduationYear?: string;
  major?: CornellMajor;
  hometown?: string;
  groups?: Group[];
  interests?: Interest[];
  goals?: Goal[];
  facebook?: string;
  instagram?: string;
  profilePictureURL?: string;
  availabilities?: Availability[];
}
