import { Column, Entity, PrimaryGeneratedColumn, ManyToMany, JoinTable } from 'typeorm';
import { SerializedClub } from '../common/types';
import User from './User'

@Entity('club')
class Club {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  /** Club name */
  @Column({
    type: 'varchar',
  })
  name: string;

  /** Users who identify as members of this club */
  @ManyToMany(
    type => User,
    user => user.clubs
  )
  @JoinTable()
  users: User[];

  serialize(): SerializedClub {
    return this.name;
  }
}

export default Club;
