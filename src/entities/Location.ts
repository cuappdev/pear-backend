import { Column, Entity, Index, PrimaryGeneratedColumn, ManyToMany, JoinTable } from 'typeorm';
import { SerializedLocation } from '../common/types';
import Match from './Match';
import User from './User';

@Entity('location')
class Location {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  /** General area of location such as Campus or Collegetown */
  @Index()
  @Column({ type: 'varchar' })
  area: string;

  /** Name of the location such as Green Dragon or Starbucks */
  @Column({ type: 'varchar' })
  name: string;

  /** Users that prefer this location */
  @ManyToMany((type) => User, (user) => user.preferredLocations)
  @JoinTable()
  users: User[];

  /** Match with this location */
  @ManyToMany((type) => Match, (match) => match.preferredLocations, { onDelete: 'CASCADE' })
  @JoinTable()
  match: Match;

  serialize(): SerializedLocation {
    return {
      area: this.area,
      name: this.name,
    };
  }
}

export default Location;
