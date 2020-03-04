// ** Represents a User */
export type SerializedUser = {
  firstName: string,
  googleID: string,
  lastName: string,
  netID: string,
  matches: SerializedMatching[]
};

// ** Represents a User without matches shown */
export type SubSerializedUser = {
  firstName: string,
  googleID: string,
  lastName: string,
  netID: string,
};

// ** Represents a matching */
export type SerializedMatching = {
  active: boolean,
  schedule: SerializedDaySchedule[],
  users: SerializedUser[]
};

// ** Represents a matching with a SubSerialized User */
export type SubSerializedMatching = {
  active: boolean,
  schedule: SerializedDaySchedule[],
  users: SubSerializedUser[]
};

// ** Represents a DaySchedule */
export type SerializedDaySchedule = {
  day: string,
  times: number[]
};

// ** Represents a Time */
export type SerializedTime = number