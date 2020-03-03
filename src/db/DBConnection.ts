import { Connection, ConnectionOptions, createConnection } from 'typeorm';

import User from '../entities/User';

const isProduction = process.env.NODE_ENV === 'production';
const dbPort = process.env.DB_PORT;

const models = [User];

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
