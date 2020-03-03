import crypto from 'crypto';
import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import uuidv4 from 'uuid/v4';

import { SerializedUserSession } from '../common/types';
import { SerializedUser } from '../common/types';
import User from './User';

@Entity('usersessions')
class UserSession {
  /** Universally unique identifier */
  @PrimaryGeneratedColumn('uuid')
  uuid: string = uuidv4();

  /** Access token associated with session */
  @Column('character varying')
  sessionToken = '';

  /** Timestamp of when the session expires (Unix time) */
  @Column('bigint')
  expiresAt = '-1';

  /** Refresh token associated with session */
  @Column('character varying')
  updateToken = '';

  /** Whether the session is active or not */
  @Column('boolean')
  isActive = true;

  user: SerializedUser = null;
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

  update(accessToken?: string, updateToken?: string): UserSession {
    this.sessionToken = accessToken || crypto.randomBytes(64).toString('hex');
    this.updateToken = updateToken || crypto.randomBytes(64).toString('hex');

    // Session length is 1 day
    this.expiresAt = String(
      Math.floor(new Date().getTime() / 1000) + 60 * 60 * 24
    );
    this.activate();
    return this;
  }

  activate(): UserSession {
    this.isActive = true;
    return this;
  }

  logOut(): UserSession {
    this.isActive = false;
    return this;
  }

  serialize(): SerializedUserSession {
    return {
      accessToken: this.sessionToken,
      isActive: this.isActive,
      refreshToken: this.updateToken,
      sessionExpiration: this.expiresAt,
    };
  }
}

export default UserSession;
