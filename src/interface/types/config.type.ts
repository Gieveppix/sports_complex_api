import { Knex } from 'knex';
import { Level } from 'pino';

export type Environment =
  // The service running in a production cluster available for customers
  | 'production'
  // The service running locally on a development machine
  | 'local';

export interface Config {
  environment: Environment;
  logLevel: Level;
  jwt_secret: string;
  authentication: {
    enabled: boolean;
    jwksUrl: string;
  };
  database: Knex.PgConnectionConfig;
}

export interface ProcessVariables {
  ENV?: Environment;
  LOG_LEVEL?: Level;
  JWT_SECRET?: string;
  JWKS_URL?: string;
  DATABASE_URL?: string;
  DATABASE_PORT?: string;
  SERVICES_URL?: string;
  CLIENT_ID?: string;
  CLIENT_SECRET?: string;
}
