import {
  Entity,
  PrimaryGeneratedColumn,
  ManyToMany,
  JoinTable,
  OneToMany,
} from 'typeorm';
import { SerializedMatching } from '../common/types';
import User from './User'
import DaySchedule from './DaySchedule';

@Entity('matching')
class Matching {

  @PrimaryGeneratedColumn('uuid')
  id: string;

  /** Users */
  @ManyToMany(type => User)
  @JoinTable()
  users: User[];

  @OneToMany(type => DaySchedule, schedule => schedule.matching)
  schedule: DaySchedule[];

  serialize(): SerializedMatching {
    const callback = (accum, currentVal) => {
      accum.push(currentVal.serialize());
      return accum;
    };
    return {
      users: [this.users.reduce(callback, [])],
      schedule: [this.schedule.reduce(callback, [])]
    };
  }

}

export default Matching