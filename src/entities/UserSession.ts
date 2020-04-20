import crypto from 'crypto';
import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { v4 as uuidv4 } from 'uuid';
import { SerializedUserSession } from '../common/types';
import User from './User';

@Entity('usersessions')
class UserSession {
  /** Universally unique identifier */
  @PrimaryGeneratedColumn('uuid')
  uuid: string = uuidv4();

  /** Access token associated with session */
  @Column({
    type: 'varchar',
    default: '',
  })
  accessToken: string;

  /** Whether the session is active or not */
  @Column({
    type: 'boolean',
    default: true,
  })
  active: boolean;

  /** Timestamp of when the session expires (Unix time) */
  @Column({
    type: 'bigint',
    default: '-1',
  })
  expiresAt: string;

  /** Refresh token associated with session */
  @Column({
    type: 'varchar',
    default: '',
  })
  refreshToken: string;

  /** User that the session belongs to */
  @OneToOne(type => User)
  @JoinColumn()
  user: User;

  static fromUser(
    user: User,
    accessToken?: string,
    refreshToken?: string
  ): UserSession {
    const session = new UserSession();
    session.user = user;
    session.update(accessToken, refreshToken);
    return session;
  }

  update(accessToken?: string, refreshToken?: string): UserSession {
    this.accessToken = accessToken || crypto.randomBytes(64).toString('hex');
    this.refreshToken = refreshToken || crypto.randomBytes(64).toString('hex');

    // Session length is 1 day
    this.expiresAt = String(
      Math.floor(new Date().getTime() / 1000) + 60 * 60 * 24
    );
    this.activate();
    return this;
  }

  activate(): UserSession {
    this.active = true;
    return this;
  }

  logOut(): UserSession {
    this.active = false;
    return this;
  }

  serialize(): SerializedUserSession {
    return {
      accessToken: this.accessToken,
      active: this.active,
      refreshToken: this.refreshToken,
      sessionExpiration: this.expiresAt,
    };
  }
}

export default UserSession;
