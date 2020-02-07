import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { SerializedUser } from '../common/types';

@Entity('users')
class User {

  @PrimaryGeneratedColumn('uuid')
  id: string;

  /** Google ID of user */
  @Column('character varying')
  googleID: string = '';

  /** Net ID of user */
  @Column('character varying')
  netID: string = '';

  /** User first name */
  @Column('character varying')
  firstName: string = '';

  /** User last name */
  @Column('character varying')
  lastName: string = '';

  serialize(): SerializedUser {
    return {
      netID: this.netID,
      googleID: this.googleID,
      firstName: this.firstName,
      lastName: this.lastName
    };
  }

}

export default User