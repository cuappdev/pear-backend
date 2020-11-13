import { Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';
import { SerializedGroup } from '../common/types';
import User from './User';

@Entity('group')
class Group {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  /** Group name */
  @Column({
    type: 'varchar',
  })
  name: string;

  /** Users who identify as members of this group */
  @ManyToMany((type) => User, (user) => user.groups)
  @JoinTable()
  users: User[];

  serialize(): SerializedGroup {
    return this.name;
  }
}

export default Group;
