import { Column, Entity, Index, JoinTable, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';
import { SerializedMatch } from '../common/types';
import Availability from './Availability';
import Location from './Location';
import User from './User';

@Entity('match')
class Match {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToMany((type) => User, (user) => user.matches)
  @JoinTable()
  users: User[];

  @ManyToMany((type) => Availability, (availability) => availability.match)
  availabilities: Availability[];

  @ManyToMany((type) => Location, (location) => location.match)
  preferredLocations: Location[];

  @Index()
  @Column({ type: 'varchar' })
  status: string;

  @Column({ type: 'timestamp', nullable: true })
  meetingTime: Date;

  serialize(): SerializedMatch {
    return {
      matchID: this.id,
      status: this.status,
      meetingTime: this.meetingTime,
      users: this.users ? this.users.map((user) => user.netID) : [],
      availabilities: this.availabilities
        ? this.availabilities.map((availability) => availability.serialize())
        : [],
      preferredLocations: this.preferredLocations
        ? this.preferredLocations.map((location) => location.serialize())
        : [],
    };
  }
}

export default Match;
