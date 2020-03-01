import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
} from 'typeorm';
import { SerializedTime, TimeEnum } from '../common/types'

@Entity('time')
class Time {

  constructor(time) {
    this.time = time
  }

  @PrimaryGeneratedColumn('uuid')
  id: string;


  @Column({
    type: "float",
  })
  time: number


  serialize(): SerializedTime {
    return {
      time: this.time
    };
  }

}

export default Time