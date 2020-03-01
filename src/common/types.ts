export type SerializedUser = {
  firstName: string,
  googleID: string,
  lastName: string,
  netID: string,
};

export type SerializedMatching = {
  users: [SerializedUser],
  schedule: [SerializedDaySchedule]
};

export type SerializedDaySchedule = {
  day: string,
  times: [number]
};

export type SerializedTime = {
  time: number
}