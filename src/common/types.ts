import Availability from '../entities/Availability';
import CornellMajor from '../entities/CornellMajor';
import Goal from '../entities/Goal';
import Group from '../entities/Group';
import Interest from '../entities/Interest';
import Location from '../entities/Location';
import TalkingPoint from '../entities/TalkingPoint';

/** Represents a User */
export interface SerializedUser {
  googleID: string;
  firstName: string;
  lastName: string;
  netID: string;
  pronouns: string | null;
  graduationYear: string | null;
  major: SerializedCornellMajor | null;
  hometown: string | null;
  groups: SerializedGroup[];
  interests: SerializedInterest[];
  goals: SerializedGoal[];
  talkingPoints: SerializedTalkingPoint[];
  facebook: string | null;
  instagram: string | null;
  profilePictureURL: string | null;
  availabilities: SerializedAvailability[];
  preferredLocations: SerializedLocation[];
  matches: SerializedMatch[];
  didOnboard: boolean;
}

/** Represents a User without groups, interests, majors, or matches shown */
export interface SubSerializedUser {
  googleID: string;
  firstName: string;
  lastName: string;
  netID: string;
  pronouns: string | null;
  graduationYear: string | null;
  major: SerializedCornellMajor | null;
  hometown: string | null;
  facebook: string | null;
  instagram: string | null;
  profilePictureURL: string | null;
  didOnboard: boolean;
}

/** Represents a User with the information necessary to be displayed on the Weekly Pear & Community screen */
export interface SerializedCommunityUser {
  netID: string;
  firstName: string;
  lastName: string;
  hometown: string | null;
  profilePictureURL: string | null;
  facebook: string | null;
  instagram: string | null;
  major: SerializedCornellMajor | null;
  graduationYear: string | null;
  pronouns: string | null;
  interests: SerializedInterest[];
  groups: SerializedGroup[];
  didOnboard: boolean;
}

/** Represents a User session */
export interface SerializedUserSession {
  accessToken: string;
  active: boolean;
  refreshToken: string;
  sessionExpiration: string;
}

/** Represents an Availability */
export type SerializedAvailability = {
  day: string;
  times: number[];
};

/** Represents a Location */
export type SerializedLocation = {
  area: string;
  name: string;
};

/** Represents a Match */
export type SerializedMatch = {
  matchID: string;
  status: string;
  meetingTime: Date;
  users: string[];
  availabilities: SerializedAvailability[];
};

/** Represents a Group */
export type SerializedGroup = string;

/** Represents a Cornell Major */
export type SerializedCornellMajor = string;

/** Represents an Interest */
export type SerializedInterest = string;

/** Represents a Goal */
export type SerializedGoal = string;

/** Represents a Talking Point */
export type SerializedTalkingPoint = string;

/** Represents the demographic subset of a User */
export interface UserDemographics {
  googleID: string;
  firstName: string;
  lastName: string;
  pronouns: string;
  graduationYear: string;
  major: SerializedCornellMajor;
  hometown: string;
  profilePictureURL: string;
}

/** Represents the social medias of a User */
export interface UserSocialMedia {
  facebook: string;
  instagram: string;
  didOnboard: boolean;
}

export interface UserUpdateFields {
  firstName?: string;
  lastName?: string;
  pronouns?: string;
  graduationYear?: string;
  major?: CornellMajor;
  hometown?: string;
  groups?: Group[];
  interests?: Interest[];
  goals?: Goal[];
  talkingPoints?: TalkingPoint[];
  facebook?: string;
  instagram?: string;
  profilePictureURL?: string;
  availabilities?: Availability[];
  preferredLocations?: Location[];
}

export interface MatchUpdateFields {
  status?: string;
  meetingTime?: Date;
  availabilities?: Availability[];
}
