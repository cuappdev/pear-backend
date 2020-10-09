import {
  PrimaryGeneratedColumn,
  Column,
  Entity,
  ManyToMany,
  ManyToOne,
} from 'typeorm';
import constants from '../common/constants';
import { SerializedUser, SubSerializedUser } from '../common/types';
import Club from './Club';
import CornellMajor from './CornellMajor';
import Interest from './Interest';
import Matching from './Matching';

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
  @Column({ type: 'varchar' })
  netID: string;

  /** User's pronouns */
  @Column({ type: 'varchar', nullable: true })
  pronouns: string | null;

  /** User's graduation year */
  @Column({ type: 'varchar', nullable: true })
  graduationYear: string | null;

  /** User's major */
  @ManyToOne(type => CornellMajor, major => major.users, { nullable: true })
  major: CornellMajor | null;

  /** User's hometown */
  @Column({ type: 'varchar', nullable: true })
  hometown: string | null;

  /** User's clubs */
  @ManyToMany(type => Club, club => club.users)
  clubs: Club[];

  /** User's interests */
  @ManyToMany(type => Interest, interest => interest.users)
  interests: Interest[];

  /** User's facebook profile link */
  @Column({ type: 'varchar', nullable: true })
  facebook: string | null;

  /** User's instagram username */
  @Column({ type: 'varchar', nullable: true })
  instagram: string | null;

  @Column({ type: 'varchar', nullable: true })
  profilePictureURL: string | null;

  /** User's matchings */
  @ManyToMany(type => Matching, matching => matching.users)
  matches: Matching[];

  /**
   * Method to create a dummy user. (For testing purposes)
   * @function
   * @param {string} id - google id used to create new user
   * @return {User} a new user with supplied google id
   */
  static dummy(id: string): User {
    const user = new User();
    user.googleID = id;
    user.firstName = 'Chuck';
    user.lastName = 'Norris';
    user.netID = 'cnorris';
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
      major: this.major ? this.major.serialize() : constants.UNDECLARED_MAJOR,
      hometown: this.hometown,
      clubs: this.clubs ? this.clubs.map(club => club.serialize()) : [],
      interests: this.interests ? this.interests.map(interest => interest.serialize()) : [],
      facebook: this.facebook,
      instagram: this.instagram,
      profilePictureURL: this.profilePictureURL,
      matches: this.matches ? this.matches.map(match => match.subSerialize()) : [],
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
      major: this.major ? this.major.serialize() : constants.UNDECLARED_MAJOR,
      hometown: this.hometown,
      facebook: this.facebook,
      instagram: this.instagram,
      profilePictureURL: this.profilePictureURL,
    };
  }
}

export default User;
