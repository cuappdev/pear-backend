import { Connection, ConnectionOptions, createConnection } from 'typeorm';

import User from '../models/User';

const isProduction = process.env.NODE_ENV === 'production';

const models = [
  User
];

const connectionOptions: ConnectionOptions = {
  entities: models,
  type: 'postgres',
  host: process.env.DB_HOST,
  port: isProduction ? +process.env.DB_PORT : 5432,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  synchronize: true,
  extra: {
    ssl: isProduction,
  },
};

const dbConnection = (): Promise<Connection> => createConnection(connectionOptions);

export default dbConnection;