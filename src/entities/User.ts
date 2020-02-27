import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { SerializedUser } from '../common/types';

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

  serialize(): SerializedUser {
    return {
      firstName: this.firstName,
      googleID: this.googleID,
      lastName: this.lastName,
      netID: this.netID,
    };
  }
}

export default User;
