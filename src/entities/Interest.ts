import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { SerializedClub } from '../common/types';
import User from './User';

@Entity('interest')
class Interest {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  /** Club name */
  @Column({
    type: 'varchar',
  })
  name: string;

  /** Users who identify as members of this interest */
  @ManyToMany(
    type => User,
    user => user.interests
  )
  @JoinTable()
  users: User[];

  serialize(): SerializedClub {
    return this.name;
  }
}

export default Interest;
