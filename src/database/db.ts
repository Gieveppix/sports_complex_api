import { Knex } from 'knex';
import pg from 'pg';
import { config } from '$/src/config/config.js';
import { require } from '$/src/helpers/require.js';

pg.types.setTypeParser(1082, (date: string) => date);

export const db = require('knex')({
  client: 'pg',
  connection: config.database,
}) as Knex;
