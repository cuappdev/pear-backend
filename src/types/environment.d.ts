declare namespace NodeJS {
  interface ProcessEnv {
    DB_PASS: string;
    DB_PORT: string;
    DB_HOST: string;
    DB_USERNAME: string;
    DB_PASSWORD: string;
    DB_NAME: string;
    GOOGLE_CLIENT_ID: string;
    NODE_ENV: 'development' | 'production';
    PORT: string;
  }
}