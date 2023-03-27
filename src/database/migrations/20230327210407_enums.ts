import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  await knex.schema.raw(
    "CREATE TYPE age_level AS ENUM ('children', 'youth', 'young_adults', 'adults')"
  );
  await knex.schema.raw(
    "CREATE TYPE class_duration AS ENUM ('30', '45', '60', '75', '90', '105', '120', '150', '180')"
  );
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.raw('DROP TYPE class_duration');
  await knex.schema.raw('DROP TYPE age_level');
}
