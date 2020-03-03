import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { SerializedMatching } from '../common/types';
import User from './User';

@Entity('matching')
class Matching {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  /** Users */
  @ManyToMany(type => User)
  @JoinTable()
  users: User[];

  //Add many to many time relationship

  // serialize(): SerializedMatching {
  //   callBack = (acc, user) =>
  //   return {
  //     users: [this.users.reduce()]
  //   };
  // }
}

export default User;
