import Club from "../entities/Club";
import Interest from "../entities/Interest";
import CornellMajor from "../entities/CornellMajor";

//** Represents a User */
export interface SerializedUser {
  clubs: SerializedClub[] | null;
  firstName: string | null;
  googleID: string;
  graduationYear: string | null;
  hometown: string | null;
  interests: SerializedInterest[] | null;
  lastName: string;
  netID: string;
  major: SerializedCornellMajor | null;
  matches: SubSerializedMatching[];
  profilePictureURL: string | null;
  pronouns: string | null;
}

//** Represents a User without clubs, interests, majors, or matches shown */
export interface SubSerializedUser {
  firstName: string;
  googleID: string;
  graduationYear: string | null;
  hometown: string | null;
  lastName: string;
  netID: string;
  profilePictureURL: string | null;
  pronouns: string | null;
}

//** Represents a User session */
export interface SerializedUserSession {
  accessToken: string;
  active: boolean;
  refreshToken: string;
  sessionExpiration: string;
}

//** Represents a matching */
export interface SerializedMatching {
  active: boolean;
  schedule: SerializedDaySchedule[];
  users: SerializedUser[];
}

//** Represents a matching with a SubSerialized User */
export interface SubSerializedMatching {
  active: boolean;
  schedule: SerializedDaySchedule[];
  users: SubSerializedUser[];
}

//** Represents a DaySchedule */
export interface SerializedDaySchedule {
  day: string;
  times: number[];
}

//** Represents a Time */
export type SerializedTime = number;

//** Represents a Club */
export type SerializedClub = string;

//** Represents a Cornell Major */
export type SerializedCornellMajor = string;

//** Represents an Interest */
export type SerializedInterest = string;

export interface UserUpdateFields {
  clubs?: Club[],
  firstName?: string,
  googleID?: string,
  graduationYear?: string,
  hometown?: string,
  interests?: Interest[],
  lastName?: string,
  netID?: string,
  major?: CornellMajor,
  profilePictureURL?: string
  pronouns?: string
}