import { Column, Entity, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
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

  /** User with this availability */
  @ManyToOne((type) => User, (user) => user.availabilities, { onDelete: 'CASCADE' })
  user: User;

  serialize(): SerializedAvailability {
    return {
      day: this.day,
      times: this.times,
    };
  }
}

export default Availability;
