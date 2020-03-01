import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToMany,
  JoinTable,
  ManyToOne,
} from 'typeorm';
import { SerializedDaySchedule, DayEnum } from '../common/types';
import Time from './Time'
import Matching from './Matching';

@Entity('dayschedule')
class DaySchedule {

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(type => Matching, matching => matching.schedule)
  matching: Matching;

  @Column({
    type: 'varchar',
  })
  day: string;

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