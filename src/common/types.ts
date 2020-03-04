// ** Represents a User */
export interface SerializedUser {
  firstName: string;
  googleID: string;
  lastName: string;
  netID: string;
  matches: SubSerializedMatching[];
}

// ** Represents a User without matches shown */
export interface SubSerializedUser {
  firstName: string;
  googleID: string;
  lastName: string;
  netID: string;
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
