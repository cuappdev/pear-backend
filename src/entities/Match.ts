import {
  Column,
  Entity,
  Index,
  JoinTable,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { SerializedMatch } from '../common/types';
import Availability from './Availability';
import User from './User';

@Entity('match')
class Match {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToMany((type) => User, (user) => user.matches)
  @JoinTable()
  users: User[];

  @OneToMany((type) => Availability, (availability) => availability.match)
  availabilities: Availability[];

  @Index()
  @Column({ type: 'varchar' })
  status: string;

  @Column({ type: 'timestamp', nullable: true })
  meetingTime: Date;

  serialize(): SerializedMatch {
    return {
      status: this.status,
      meetingTime: this.meetingTime,
      users: this.users ? this.users.map((user) => user.netID) : [],
      availabilities: this.availabilities
        ? this.availabilities.map((availability) => availability.serialize())
        : [],
    };
  }
}

export default Match;
