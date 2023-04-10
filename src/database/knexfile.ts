import { Knex } from 'knex';

export default {
  client: 'pg',
  connection: 'postgres://root:pass@127.0.0.1:5432/sports_complex',
  migrations: {
    directory: './migrations',
  },
  seeds: {
    directory: './seeds',
  },
} as Knex.Config;
