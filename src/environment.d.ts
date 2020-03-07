declare namespace NodeJS {
  interface ProcessEnv {
    DB_NAME: string;
    DB_PASS: string;
    DB_PORT: string;
    DB_USERNAME: string;
    GOOGLE_CLIENT_ID: string;
    HOST: string;
    NODE_ENV: 'development' | 'production';
    PORT: string;
  }
}