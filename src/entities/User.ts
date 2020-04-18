import {
  PrimaryGeneratedColumn,
  Column,
  Entity,
  ManyToMany,
} from 'typeorm';
import {
  SerializedUser,
  SubSerializedUser,
  SubSerializedMatching,
} from '../common/types';
import Matching from './Matching';
import Club from './Club';

@Entity('user')
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

  /** User's matchings */
  @ManyToMany(
    type => Matching,
    matching => matching.users
  )
  matches: Matching[];

  /** User's graduation year */
  @Column({
    type: 'varchar'
  })
  graduation_year: string;

  /** User's major */
  @Column({
    type: 'varchar'
  })
  major: string;

  /** User's hometown year */
  @Column({
    type: 'varchar'
  })
  hometown: string;

  /** User's pronouns */
  @Column({
    type: 'varchar'
  })
  pronouns: string;


  serialize(): SerializedUser {
    const callback = (accum: SubSerializedMatching[], currentVal: Matching) => {
      accum.push(currentVal.subSerialize());
      return accum;
    };
    return {
      firstName: this.firstName,
      googleID: this.googleID,
      lastName: this.lastName,
      netID: this.netID,
      matches: this.matches.reduce(callback, []),
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
