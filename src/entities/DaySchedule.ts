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
  matching: Matching

  @Column({
    type: 'varchar',
    default: ''
  })
  Day: DayEnum

  @ManyToMany(type => Time)
  @JoinTable()
  Times: Time[];

  serialize(): SerializedDaySchedule {
    const callback = (accum, currentVal) => accum.push(currentVal.serialize());
    return {
      day: this.Day,
      times: [this.Times.reduce(callback, [])]
    };
  }

}

export default DaySchedule