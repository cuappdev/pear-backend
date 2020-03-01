import {
  Entity,
  JoinTable,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn
} from 'typeorm';
import { SerializedMatching } from '../common/types';
import DaySchedule from './DaySchedule';
import User from './User';

@Entity('matching')
class Matching {

  @PrimaryGeneratedColumn('uuid')
  id: string;

  /** List of days and times for this matching */
  @OneToMany(type => DaySchedule, schedule => schedule.matching)
  schedule: DaySchedule[];

  /** Users in this matching */
  @ManyToMany(type => User)
  @JoinTable()
  users: User[];

  serialize(): SerializedMatching {
    const callback = (accum, currentVal) => {
      accum.push(currentVal.serialize());
      return accum;
    };
    return {
      schedule: [this.schedule.reduce(callback, [])],
      users: [this.users.reduce(callback, [])]
    };
  }

}

export default Matching;