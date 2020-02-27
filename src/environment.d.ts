declare namespace NodeJS {
  interface ProcessEnv {
    PORT: string;
    DB_PORT: string;
    HOST: string;
    DB_USERNAME: string;
    DB_PASS: string;
    DB_NAME: string;
    NODE_ENV: 'development' | 'production';
  }
}