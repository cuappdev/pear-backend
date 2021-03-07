import { PrimaryGeneratedColumn, Column, Entity, ManyToMany, ManyToOne } from 'typeorm';
import Constants from '../common/constants';
import { SerializedUser, SubSerializedUser, SerializedCommunityUser } from '../common/types';
import Availability from './Availability';
import CornellMajor from './CornellMajor';
import Goal from './Goal';
import Group from './Group';
import Interest from './Interest';
import Location from './Location';
import Match from './Match';
import TalkingPoint from './TalkingPoint';
import AppDevUtils from '../utils/AppDevUtils';

@Entity('pear_user')
class User {
  @PrimaryGeneratedColumn('uuid')
  uuid: string;

  /** Google ID of user */
  @Column({ type: 'varchar' })
  googleID: string;

  /** User first name */
  @Column({ type: 'varchar' })
  firstName: string;

  /** User last name */
  @Column({ type: 'varchar' })
  lastName: string;

  /** Net ID of user */
  @Column({ type: 'varchar', unique: true })
  netID: string;

  /** User's pronouns */
  @Column({ type: 'varchar', nullable: true })
  pronouns: string | null;

  /** User's graduation year */
  @Column({ type: 'varchar', nullable: true })
  graduationYear: string | null;

  /** User's major */
  @ManyToOne((type) => CornellMajor, (major) => major.users, {
    nullable: true,
    onDelete: 'CASCADE',
  })
  major: CornellMajor | null;

  /** User's hometown */
  @Column({ type: 'varchar', nullable: true })
  hometown: string | null;

  /** User's groups */
  @ManyToMany((type) => Group, (group) => group.users, { onDelete: 'CASCADE' })
  groups: Group[];

  /** User's interests */
  @ManyToMany((type) => Interest, (interest) => interest.users, { onDelete: 'CASCADE' })
  interests: Interest[];

  /** User's matching goals */
  @ManyToMany((type) => Goal, (goal) => goal.users, { onDelete: 'CASCADE' })
  goals: Goal[];

  /** User's talking points */
  @ManyToMany((type) => TalkingPoint, (talkingPoint) => talkingPoint.users, {
    onDelete: 'CASCADE',
  })
  talkingPoints: TalkingPoint[];

  /** User's facebook profile link */
  @Column({ type: 'varchar', nullable: true })
  facebook: string | null;

  /** User's instagram username */
  @Column({ type: 'varchar', nullable: true })
  instagram: string | null;

  @Column({ type: 'varchar', nullable: true })
  profilePictureURL: string | null;

  /** User's preferred locations */
  @ManyToMany((type) => Location, (location) => location.users, { onDelete: 'CASCADE' })
  preferredLocations: Location[];

  /** User's availabilities */
  @ManyToMany((type) => Availability, (availability) => availability.users, { onDelete: 'CASCADE' })
  availabilities: Availability[];

  /** User's matches */
  @ManyToMany((type) => Match, (match) => match.users, { onDelete: 'CASCADE' })
  matches: Match[];

  /**
   * Method to create a dummy user. (For testing purposes)
   * @function
   * @param {string} firstName - first name used to create new user
   * @param {string} googleID - google ID used to create new user
   * @param {string} lastName - last name used to create new user
   * @param {string} netID - netID used to create new user
   * @return {User} a new user with supplied arguments
   */
  static dummy(firstName: string, googleID: string, lastName: string, netID: string): User {
    const user = new User();
    user.firstName = firstName;
    user.googleID = googleID;
    user.lastName = lastName;
    user.netID = netID;
    return user;
  }

  serialize(): SerializedUser {
    return {
      googleID: this.googleID,
      firstName: this.firstName,
      lastName: this.lastName,
      netID: this.netID,
      pronouns: this.pronouns,
      graduationYear: this.graduationYear,
      major: this.major ? this.major.serialize() : Constants.UNDECLARED_MAJOR,
      hometown: this.hometown,
      groups: this.groups ? this.groups.map((group) => group.serialize()) : [],
      interests: this.interests ? this.interests.map((interest) => interest.serialize()) : [],
      goals: this.goals ? this.goals.map((goal) => goal.serialize()) : [],
      talkingPoints: this.talkingPoints ? this.talkingPoints.map((topic) => topic.serialize()) : [],
      facebook: this.facebook,
      instagram: this.instagram,
      profilePictureURL: this.profilePictureURL,
      preferredLocations: this.preferredLocations
        ? this.preferredLocations.map((location) => location.serialize())
        : [],
      availabilities: this.availabilities
        ? this.availabilities.map((availability) => availability.serialize())
        : [],
      matches: this.matches
        ? this.matches.filter(AppDevUtils.isWeeklyMatch).map((match) => match.serialize())
        : [],
    };
  }

  subSerialize(): SubSerializedUser {
    return {
      googleID: this.googleID,
      firstName: this.firstName,
      lastName: this.lastName,
      netID: this.netID,
      pronouns: this.pronouns,
      graduationYear: this.graduationYear,
      major: this.major ? this.major.serialize() : Constants.UNDECLARED_MAJOR,
      hometown: this.hometown,
      facebook: this.facebook,
      instagram: this.instagram,
      profilePictureURL: this.profilePictureURL,
    };
  }

  communitySerialize(): SerializedCommunityUser {
    return {
      netID: this.netID,
      firstName: this.firstName,
      lastName: this.lastName,
      hometown: this.hometown,
      profilePictureURL: this.profilePictureURL,
      facebook: this.facebook,
      instagram: this.instagram,
      major: this.major ? this.major.serialize() : Constants.UNDECLARED_MAJOR,
      graduationYear: this.graduationYear,
      pronouns: this.pronouns,
      interests: this.interests ? this.interests.map((interest) => interest.serialize()) : [],
      groups: this.groups ? this.groups.map((group) => group.serialize()) : [],
    };
  }
}

export default User;
