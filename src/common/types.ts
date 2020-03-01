export type SerializedUser = {
  firstName: string,
  googleID: string,
  lastName: string,
  netID: string,
  matchings: SerializedMatching[]
};

export type SubSerializedUser = {
  firstName: string,
  googleID: string,
  lastName: string,
  netID: string,
};

export type SerializedMatching = {
  active: boolean,
  schedule: SerializedDaySchedule[],
  users: SerializedUser[]
};

export type SubSerializedMatching = {
  active: boolean,
  schedule: SerializedDaySchedule[],
  users: SubSerializedUser[]
};

export type SerializedDaySchedule = {
  day: string,
  times: number[]
};

export type SerializedTime = number