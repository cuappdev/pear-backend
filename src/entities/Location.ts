import { Column, Entity, Index, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { SerializedLocation } from '../common/types';
import User from './User';

@Entity('location')
class Location {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  /** General area of location */
  @Index()
  @Column({ type: 'varchar' })
  area: string;

  /** Name of the location */
  @Column({ type: 'varchar' })
  name: string;

  /** User that prefers this location */
  @ManyToOne((type) => User, (user) => user.preferredLocations, { onDelete: 'CASCADE' })
  user: User;

  serialize(): SerializedLocation {
    return {
      area: this.area,
      name: this.name,
    };
  }
}

export default Location;
