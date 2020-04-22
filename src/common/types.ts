// ** Represents a User */
export interface SerializedUser {
  clubs: SerializedClub[];
  firstName: string;
  googleID: string;
  graduationYear: string;
  hometown: string;
  interests: SerializedInterest[];
  lastName: string;
  netID: string;
  major: SerializedCornellMajor;
  matches: SubSerializedMatching[];
  profilePictureURL: string | null;
  pronouns: string;
}

// ** Represents a User without matches shown */
export interface SubSerializedUser {
  firstName: string;
  googleID: string;
  lastName: string;
  netID: string;
}

// ** Represents a User session */
export interface SerializedUserSession {
  accessToken: string;
  active: boolean;
  refreshToken: string;
  sessionExpiration: string;
}

// ** Represents a matching */
export interface SerializedMatching {
  active: boolean;
  schedule: SerializedDaySchedule[];
  users: SerializedUser[];
}

// ** Represents a matching with a SubSerialized User */
export interface SubSerializedMatching {
  active: boolean;
  schedule: SerializedDaySchedule[];
  users: SubSerializedUser[];
}

// ** Represents a DaySchedule */
export interface SerializedDaySchedule {
  day: string;
  times: number[];
}

// ** Represents a Time */
export type SerializedTime = number;

// ** Represents a Club */
export type SerializedClub = string;

// ** Represents a Cornell Major */
export type SerializedCornellMajor = string;

// ** Represents an Interest */
export type SerializedInterest = string;
