import {
  PrimaryGeneratedColumn,
  Column,
  Entity,
  ManyToMany,
  ManyToOne,
} from 'typeorm';
import {
  SerializedUser,
  SubSerializedUser,
} from '../common/types';
import Club from './Club';
import CornellMajor from './CornellMajor';
import Interest from './Interest';
import Matching from './Matching';


@Entity('pear_user')
class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  /** User's clubs */
  @ManyToMany(
    type => Club,
    club => club.users
  )
  clubs: Club[];

  /** User first name */
  @Column({
    type: 'varchar',
    default: '',
  })
  firstName: string;

  /** Google ID of user */
  @Column({
    type: 'varchar',
    default: '',
  })
  googleID: string;

  /** User's graduation year */
  @Column({
    type: 'varchar'
  })
  graduationYear: string;

  /** User's hometown year */
  @Column({
    type: 'varchar'
  })
  hometown: string;

  /** User's interests */
  @ManyToMany(
    type => Interest,
    interest => interest.users
  )
  interests: Interest[];

  /** User last name */
  @Column({
    type: 'varchar',
    default: '',
  })
  lastName: string;

  /** Net ID of user */
  @Column({
    type: 'varchar',
    default: '',
  })
  netID: string;

  /** User's major */
  @ManyToOne(
    type => CornellMajor,
    major => major.users
  )
  major: CornellMajor;

  /** User's matchings */
  @ManyToMany(
    type => Matching,
    matching => matching.users
  )
  matches: Matching[];

  @Column({
    type: 'varchar',
    nullable: true
  })
  profilePictureURL: string | null;

  /** User's pronouns */
  @Column({
    type: 'varchar'
  })
  pronouns: string;


  serialize(): SerializedUser {
    return {
      clubs: this.clubs.map((club) => { return club.serialize() }),
      firstName: this.firstName,
      googleID: this.googleID,
      graduationYear: this.graduationYear,
      hometown: this.hometown,
      interests: this.interests.map((interest) => { return interest.serialize() }),
      lastName: this.lastName,
      netID: this.netID,
      major: this.major.serialize(),
      matches: this.matches.map((match) => { return match.subSerialize() }),
      profilePictureURL: this.profilePictureURL,
      pronouns: this.pronouns
    };
  }

  subSerialize(): SubSerializedUser {
    return {
      firstName: this.firstName,
      googleID: this.googleID,
      lastName: this.lastName,
      netID: this.netID,
    };
  }
}

export default User;
