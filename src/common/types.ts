export type SerializedUser = {
  firstName: string,
  googleID: string,
  lastName: string,
  netID: string,
};

export type SerializedMatching = {
  user1: SerializedUser,
  user2: SerializedUser
};