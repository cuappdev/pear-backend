import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn
} from 'typeorm';
import { SerializedDaySchedule } from '../common/types';
import Matching from './Matching';
import Time from './Time'

@Entity('dayschedule')
class DaySchedule {

  @PrimaryGeneratedColumn('uuid')
  id: string;

  /** The day of this day-schedule */
  @Column({
    type: 'varchar',
  })
  day: string;

  /** The matching this day-schedule belongs to */
  @ManyToOne(type => Matching, matching => matching.schedule)
  matching: Matching;

  /** The available times for this day-schedule */
  @ManyToMany(type => Time)
  @JoinTable()
  times: Time[];

  serialize(): SerializedDaySchedule {
    const callback = (accum, currentVal) => {
      accum.push(currentVal.serialize());
      return accum;
    };
    return {
      day: this.day,
      times: [this.times.reduce(callback, [])]
    };
  }

}

export default DaySchedule;