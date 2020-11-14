import { Column, Entity, PrimaryGeneratedColumn, ManyToMany, JoinTable } from 'typeorm';
import { SerializedGoal } from '../common/types';
import User from './User';

@Entity('goal')
class Goal {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  /** Goal name */
  @Column({
    type: 'varchar',
  })
  name: string;

  /** Users who identify as members of this goal */
  @ManyToMany((type) => User, (user) => user.goals)
  @JoinTable()
  users: User[];

  serialize(): SerializedGoal {
    return this.name;
  }
}

export default Goal;
