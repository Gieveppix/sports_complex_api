import { Knex } from 'knex';
import dotenv from 'dotenv';

dotenv.config();

export default {
  client: 'pg',
  connection: process.env.DATABASE_URL,
  migrations: {
    directory: './migrations',
  },
  seeds: {
    directory: './seeds',
  },
} as Knex.Config;
