import { Knex } from 'knex';
import { types } from 'pg';
import { config } from '$/src/config/config.js';

types.setTypeParser(1082, (date: string) => date);

// eslint-disable-next-line @typescript-eslint/no-var-requires
export const db = require('knex')({
  client: 'pg',
  connection: config.database,
}) as Knex;
