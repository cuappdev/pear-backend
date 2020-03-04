import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import {
  SerializedMatching,
  SerializedDaySchedule,
  SerializedUser,
  SubSerializedMatching,
  SubSerializedUser,
} from '../common/types';
import DaySchedule from './DaySchedule';
import User from './User';

@Entity('matching')
class Matching {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    type: 'bool',
  })
  active: boolean;

  /** List of days and times for this matching */
  @OneToMany(
    type => DaySchedule,
    schedule => schedule.matching
  )
  schedule: DaySchedule[];

  /** Users in this matching */
  @ManyToMany(
    type => User,
    user => user.matches
  )
  @JoinTable()
  users: User[];

  serialize(): SerializedMatching {
    const callbackSchedule = (
      accum: SerializedDaySchedule[],
      currentVal: DaySchedule
    ) => {
      accum.push(currentVal.serialize());
      return accum;
    };
    const callbackUser = (accum: SerializedUser[], currentVal: User) => {
      accum.push(currentVal.serialize());
      return accum;
    };
    return {
      active: this.active,
      schedule: this.schedule.reduce(callbackSchedule, []),
      users: this.users.reduce(callbackUser, []),
    };
  }

  subSerialize(): SubSerializedMatching {
    const callbackSchedule = (
      accum: SerializedDaySchedule[],
      currentVal: DaySchedule
    ) => {
      accum.push(currentVal.serialize());
      return accum;
    };
    const callbackUser = (accum: SubSerializedUser[], currentVal: User) => {
      accum.push(currentVal.subSerialize());
      return accum;
    };
    return {
      active: this.active,
      schedule: this.schedule.reduce(callbackSchedule, []),
      users: this.users.reduce(callbackUser, []),
    };
  }
}

export default Matching;
