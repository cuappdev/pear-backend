export interface SerializedUser {
  firstName: string;
  googleID: string;
  lastName: string;
  netID: string;
}

export interface SerializedUserSession {
  accessToken: string;
  isActive: boolean;
  refreshToken: string;
  sessionExpiration: string;
}
export interface SerializedMatching {
  user1: SerializedUser;
  user2: SerializedUser;
}
