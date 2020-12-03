import { Connection, ConnectionOptions, createConnection } from 'typeorm';
import Availability from '../entities/Availability';
import CornellMajor from '../entities/CornellMajor';
import Goal from '../entities/Goal';
import Group from '../entities/Group';
import Interest from '../entities/Interest';
import Match from '../entities/Match';
import TalkingPoint from '../entities/TalkingPoint';
import User from '../entities/User';
import UserSession from '../entities/UserSession';

const isProduction = process.env.NODE_ENV === 'production';

const models = [
  Availability,
  CornellMajor,
  Goal,
  Group,
  Interest,
  Match,
  TalkingPoint,
  User,
  UserSession,
];

const connectionOptions: ConnectionOptions = {
  database: process.env.DB_NAME,
  entities: models,
  extra: {
    ssl: isProduction,
  },
  host: process.env.DB_HOST,
  port: isProduction ? +process.env.DB_PORT : 5432,
  password: process.env.DB_PASSWORD,
  type: 'postgres',
  synchronize: true,
  username: process.env.DB_USERNAME,
};

const dbConnection = (): Promise<Connection> => createConnection(connectionOptions);

export default dbConnection;
