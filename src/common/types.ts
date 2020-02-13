export type SerializedUser = {
  firstName: string,
  googleID: string,
  lastName: string,
  netID: string,
};

export type SerializedUserSession = {
  accessToken: string,
  isActive: boolean,
  refreshToken: string,
  sessionExpiration: string
}