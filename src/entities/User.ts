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

  /** User first name */
  @Column('character varying')
  firstName: string = '';

  /** Google ID of user */
  @Column('character varying')
  googleID: string = '';

  /** User last name */
  @Column('character varying')
  lastName: string = '';

  /** Net ID of user */
  @Column('character varying')
  netID: string = '';


  serialize(): SerializedUser {
    return {
      firstName: this.firstName,
      googleID: this.googleID,
      lastName: this.lastName,
      netID: this.netID
    };
  }

}

export default User