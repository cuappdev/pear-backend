import { Column, Entity, JoinTable, ManyToMany, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { SerializedMatching, SubSerializedMatching } from '../common/types';
import DaySchedule from './DaySchedule';
import User from './User';

@Entity('matching')
class Matching {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  /** Whether the matching is active or not */
  @Column({
    type: 'bool',
  })
  active: boolean;

  /** List of days and times for this matching */
  @OneToMany((type) => DaySchedule, (schedule) => schedule.matching)
  schedule: DaySchedule[];

  /** Users in this matching */
  @ManyToMany((type) => User, (user) => user.matches)
  @JoinTable()
  users: User[];

  serialize(): SerializedMatching {
    return {
      active: this.active,
      schedule: this.schedule.map((schedule) => schedule.serialize()),
      users: this.users.map((user) => user.serialize()),
    };
  }

  subSerialize(): SubSerializedMatching {
    return {
      active: this.active,
      schedule: this.schedule.map((schedule) => schedule.serialize()),
      users: this.users.map((user) => user.subSerialize()),
    };
  }
}

export default Matching;
