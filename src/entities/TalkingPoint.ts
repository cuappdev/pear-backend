import { Column, Entity, PrimaryGeneratedColumn, ManyToMany, JoinTable } from 'typeorm';
import { SerializedTalkingPoint } from '../common/types';
import User from './User';

@Entity('talking_point')
class TalkingPoint {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  /** Talking Point name */
  @Column({
    type: 'varchar',
  })
  name: string;

  /** Users who identify as members of this talking point */
  @ManyToMany((type) => User, (user) => user.talkingPoints)
  @JoinTable()
  users: User[];

  serialize(): SerializedTalkingPoint {
    return this.name;
  }
}

export default TalkingPoint;
