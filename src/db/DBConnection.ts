import { Connection, ConnectionOptions, createConnection } from 'typeorm';
import Availability from '../entities/Availability';
import Constants from '../common/constants';
import CornellMajor from '../entities/CornellMajor';
import Goal from '../entities/Goal';
import Group from '../entities/Group';
import Interest from '../entities/Interest';
import Location from '../entities/Location';
import Match from '../entities/Match';
import TalkingPoint from '../entities/TalkingPoint';
import User from '../entities/User';
import UserSession from '../entities/UserSession';

const models = [
  Availability,
  CornellMajor,
  Goal,
  Group,
  Interest,
  Location,
  Match,
  TalkingPoint,
  User,
  UserSession,
];

const connectionOptions: ConnectionOptions = {
  database: process.env.DB_NAME,
  entities: models,
  extra: {
    ssl: Constants.IS_PRODUCTION,
  },
  host: process.env.DB_HOST,
  port: +process.env.DB_PORT,
  password: process.env.DB_PASSWORD,
  type: 'postgres',
  synchronize: true,
  username: process.env.DB_USERNAME,
};

const dbConnection = (): Promise<Connection> => createConnection(connectionOptions);

export default dbConnection;
