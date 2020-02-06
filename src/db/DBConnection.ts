import { Connection, ConnectionOptions, createConnection } from 'typeorm';

import User from '../models/User';

const isProduction = process.env.NODE_ENV === 'production';

const models = [
  User
];

const connectionOptions: ConnectionOptions = {
  entities: models,
  type: 'postgres',
  host: "localhost",
  port: 5432,
  username: "postgres",
  password: "",
  database: "pear",
  synchronize: true,
  extra: {
    ssl: isProduction,
  },
};

const dbConnection = (): Promise<Connection> => createConnection(connectionOptions);

export default dbConnection;