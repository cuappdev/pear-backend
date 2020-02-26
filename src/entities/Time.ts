import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
} from 'typeorm';
import { SerializedTime, TimeEnum } from '../common/types'

@Entity('time')
class Time {

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    type: 'int',
    default: ''
  })
  time: TimeEnum

  serialize(): SerializedTime {
    return {
      time: this.time
    };
  }

}

export default Time