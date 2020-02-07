import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

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

  /**
   * Method to create a dummy user. (For testing purposes)
   * @function
   * @param {string} id - google id used to create new user
   * @return {User} a new user with supplied google id
   */
  static dummy(id: string): User {
    const user = new User();
    user.googleID = id;
    user.firstName = '';
    user.lastName = '';
    user.netID = '';
    return user;
  }
}

export default User