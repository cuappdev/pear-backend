import { Connection, ConnectionOptions, createConnection } from 'typeorm';
import Time from '../entities/Time'
import User from '../entities/User';
import DaySchedule from '../entities/DaySchedule';
import Matching from '../entities/Matching';

const isProduction = process.env.NODE_ENV === 'production';

const models = [
  User,
  Time,
  DaySchedule,
  Matching
];

const connectionOptions: ConnectionOptions = {
  database: process.env.DB_NAME,
  entities: models,
  extra: {
    ssl: isProduction,
  },
  host: process.env.DB_HOST,
  port: isProduction ? parseInt(process.env.DB_PORT) : 5432,
  password: process.env.DB_PASSWORD,
  type: 'postgres',
  synchronize: true,
  username: process.env.DB_USERNAME,
};

const dbConnection = (): Promise<Connection> => createConnection(connectionOptions);

export default dbConnection;