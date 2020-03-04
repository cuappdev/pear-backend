import {
  PrimaryGeneratedColumn,
  Column,
  Entity,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import {
  SerializedUser,
  SubSerializedUser,
  SubSerializedMatching,
  SerializedMatching,
} from '../common/types';
import Matching from './Matching';

@Entity('users')
class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

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

  @ManyToMany(
    type => Matching,
    matching => matching.users
  )
  matches: Matching[];

  serialize(): SerializedUser {
    const callback = (accum: SerializedMatching[], currentVal: Matching) => {
      accum.push(currentVal.serialize());
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
