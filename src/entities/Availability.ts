import { Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';
import { SerializedAvailability } from '../common/types';
import User from './User';

@Entity('availability')
class Availability {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  /** Day of availability */
  @Column({
    type: 'varchar',
  })
  day: string;

  /** Times of availability formatted as floats (e.g. 14.5 = 2:30 PM) */
  @Column({
    type: 'real',
    array: true,
  })
  times: number[];

  /** Users with this availability */
  @ManyToMany((type) => User, (user) => user.availabilities, {
    eager: true,
  })
  @JoinTable()
  users: User[];

  serialize(): SerializedAvailability {
    return {
      day: this.day,
      times: this.times,
      users: this.users ? this.users.map((user) => user.subSerialize()) : [],
    };
  }
}

export default Availability;
