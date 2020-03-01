import {
  PrimaryGeneratedColumn,
  Column,
  Entity,
  ManyToMany,
  JoinTable
} from 'typeorm';
import { SerializedUser, SubSerializedUser } from '../common/types';
import Matching from './Matching';

@Entity('users')
class User {

  @PrimaryGeneratedColumn('uuid')
  id: string;

  /** User first name */
  @Column({
    type: 'varchar',
    default: ''
  })
  firstName: string;

  /** Google ID of user */
  @Column({
    type: 'varchar',
    default: ''
  })
  googleID: string;

  /** User last name */
  @Column({
    type: 'varchar',
    default: ''
  })
  lastName: string;

  /** Net ID of user */
  @Column({
    type: 'varchar',
    default: ''
  })
  netID: string;

  @ManyToMany(type => Matching, matching => matching.users)
  matchings: Matching[]

  serialize(): SerializedUser {
    const callback = (accum, currentVal) => {
      accum.push(currentVal.subSerialize());
      return accum;
    };
    return {
      firstName: this.firstName,
      googleID: this.googleID,
      lastName: this.lastName,
      netID: this.netID,
      matchings: this.matchings.reduce(callback, [])
    };
  }

  subSerialize(): SubSerializedUser {
    return {
      firstName: this.firstName,
      googleID: this.googleID,
      lastName: this.lastName,
      netID: this.netID
    };
  }

}

export default User;