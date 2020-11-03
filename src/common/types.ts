import Availability from '../entities/Availability';
import Club from '../entities/Club';
import Interest from '../entities/Interest';
import CornellMajor from '../entities/CornellMajor';

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
  clubs: SerializedClub[];
  interests: SerializedInterest[];
  facebook: string | null;
  instagram: string | null;
  profilePictureURL: string | null;
  availabilities: SerializedAvailability[];
}

/* Represents a User without clubs, interests, majors, or matches shown */
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
  times: string[];
  users: SubSerializedUser[];
};

/* Represents a Club */
export type SerializedClub = string;

/* Represents a Cornell Major */
export type SerializedCornellMajor = string;

/* Represents an Interest */
export type SerializedInterest = string;

export interface UserUpdateFields {
  firstName?: string;
  lastName?: string;
  pronouns?: string;
  graduationYear?: string;
  major?: CornellMajor;
  hometown?: string;
  clubs?: Club[];
  interests?: Interest[];
  facebook?: string;
  instagram?: string;
  profilePictureURL?: string;
  availabilities?: Availability[];
}
