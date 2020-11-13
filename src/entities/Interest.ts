import { Column, Entity, PrimaryGeneratedColumn, ManyToMany, JoinTable } from 'typeorm';
import { SerializedInterest } from '../common/types';
import User from './User';

@Entity('interest')
class Interest {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  /** Interest name */
  @Column({
    type: 'varchar',
  })
  name: string;

  /** Users who identify as members of this interest */
  @ManyToMany((type) => User, (user) => user.interests)
  @JoinTable()
  users: User[];

  serialize(): SerializedInterest {
    return this.name;
  }
}

export default Interest;
