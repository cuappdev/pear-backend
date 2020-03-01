export type SerializedUser = {
  firstName: string,
  googleID: string,
  lastName: string,
  netID: string,
};

export type SerializedMatching = {
  schedule: [SerializedDaySchedule],
  users: [SerializedUser]
};

export type SerializedDaySchedule = {
  day: string,
  times: [number]
};

export type SerializedTime = {
  time: number
}