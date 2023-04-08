import { Knex } from 'knex';
import { Level } from 'pino';

export type Environment =
  // The service running in a production cluster available for customers
  | 'production'
  // The service running locally on a development machine
  | 'local';

export type Sendgrid = {
  api_key: string | undefined;
  from_email: string | undefined;
  email_username: string | undefined;
  email_password: string | undefined;
  sender_name: string | undefined;
};

export interface Config {
  port: string | undefined;
  environment: Environment;
  logLevel: Level;
  jwt_secret: string;
  database: Knex.PgConnectionConfig;
  sendgrid: Sendgrid;
}

export interface ProcessVariables {
  PORT?: string;
  ENV?: Environment;
  LOG_LEVEL?: Level;
  JWT_SECRET?: string;
  PG_URL?: string;
  PG_PORT?: string;
  PG_HOST?: string;
  PG_USER?: string;
  PG_NAME?: string;
  PG_PASS?: string;
  SENDGRID_API_KEY?: string;
  SENDGRID_FROM_EMAIL?: string;
  EMAIL_USERNAME?: string;
  EMAIL_PASSWORD?: string;
  EMAIL_FROM?: string;
}
