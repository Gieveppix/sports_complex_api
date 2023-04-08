import { Knex } from 'knex';
// import { config } from '$/src/config/config.js';
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
