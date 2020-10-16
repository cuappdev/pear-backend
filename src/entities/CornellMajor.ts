import { Column, Entity, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { SerializedCornellMajor } from '../common/types';
import User from './User';

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
  @OneToMany((type) => User, (user) => user.major)
  users: User[];

  serialize(): SerializedCornellMajor {
    return this.name;
  }
}

export default CornellMajor;
