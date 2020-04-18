import { Column, Entity, PrimaryGeneratedColumn, ManyToMany, JoinTable } from 'typeorm';
import { SerializedCornellMajor } from '../common/types';
import User from './User'

@Entity('major')
class CornellMajor {
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

  serialize(): SerializedCornellMajor {
    return this.name;
  }
}

export default CornellMajor;