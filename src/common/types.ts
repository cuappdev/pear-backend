export enum DayEnum {
  Monday = "monday",
  Tuesday = "tuesday",
  Wednesday = "wednesday",
  Thursday = "thursday",
  Friday = "Friday"
}

export enum TimeEnum {
  NineThirty = 9.5,
  Ten = 10,
  TenThirty = 10.5,
  Eleven = 11,
  ElevenThirty = 11.5,
  Twelve = 12,
  TwelveThirty = 12.5,
  Thirteen = 13,
  ThirteenThirty = 13.5,
  Fourteen = 14,
  FourteenThirty = 14.5,
  Fifteen = 15,
  FifteenThirty = 15.5,
  Sixteen = 16,
  SixteenThirty = 16.5,
  Seventeen = 17,
  SeventeenThirty = 17.5,
  Eighteen = 18,
  EighteenThirty = 18.5,
  Nineteen = 19,
  NineteenThirty = 19.5,
  Twenty = 20,
  TwentyThirty = 20.5
}

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
  day: DayEnum,
  times: [TimeEnum]
};

export type SerializedTime = {
  time: TimeEnum
}