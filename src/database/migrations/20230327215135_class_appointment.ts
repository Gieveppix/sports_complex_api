import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('class_appointment', (table) => {
    table.increments('id').primary();
    table.integer('class_id').unsigned().references('id').inTable('class');
    table.dateTime('starting_at').notNullable();
    table
      .enu('age_category', ['children', 'youth', 'young_adults', 'adults'])
      .notNullable();
    table.enu('duration', [
      '30',
      '45',
      '60',
      '75',
      '90',
      '105',
      '120',
      '150',
      '180',
    ]);
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable('class_appointment');
}
