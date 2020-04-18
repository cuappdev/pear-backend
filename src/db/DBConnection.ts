import { Connection, ConnectionOptions, createConnection } from 'typeorm';
import Club from '../entities/Club';
import CornellMajor from '../entities/CornellMajor';
import DaySchedule from '../entities/DaySchedule';
import Matching from '../entities/Matching';
import Time from '../entities/Time';
import User from '../entities/User';

const isProduction = process.env.NODE_ENV === 'production';

const models = [Club, CornellMajor, DaySchedule, Matching, Time, User];

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

const dbConnection = (): Promise<Connection> =>
  createConnection(connectionOptions);

export default dbConnection;
