import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { SerializedTime } from '../common/types';

@Entity('time')
class Time {

  @PrimaryGeneratedColumn('uuid')
  id: string;

  /** Time formatted as a float (e.g. 14.5 = 2:30 PM) */
  @Column({
    type: "float",
  })
  time: number;

  serialize(): SerializedTime {
    return this.time
  }

}

export default Time;