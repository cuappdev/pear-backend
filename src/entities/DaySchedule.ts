import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn
} from 'typeorm';
import { DayEnum, SerializedDaySchedule } from '../common/types';
import Matching from './Matching';
import Time from './Time'

@Entity('dayschedule')
class DaySchedule {

  @PrimaryGeneratedColumn('uuid')
  id: string;

  /** The matching this day schedule belongs to */
  @ManyToOne(type => Matching, matching => matching.schedule)
  matching: Matching;

  /** The day of this schedule */
  @Column({
    type: 'varchar',
  })
  day: string;

  /** The available times for this day */
  @ManyToMany(type => Time)
  @JoinTable()
  times: Time[];

  serialize(): SerializedDaySchedule {
    const callback = (accum, currentVal) => {
      accum.push(currentVal.serialize());
      return accum;
    };
    return {
      day: this.day as DayEnum,
      times: [this.times.reduce(callback, [])]
    };
  }

}

export default DaySchedule