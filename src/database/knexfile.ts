import { Knex } from 'knex';
import { config } from '$/src/config/config.js';

export default {
  client: 'pg',
  connection: config.database,
  migrations: {
    directory: './migrations',
  },
  seeds: {
    directory: './seeds',
  },
} as Knex.Config;
