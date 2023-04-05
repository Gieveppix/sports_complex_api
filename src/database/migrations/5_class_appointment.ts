import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('class_appointment', (table) => {
    table.increments('id').primary();
    table
      .integer('class_id')
      .unsigned()
      .references('id')
      .inTable('class')
      .onDelete('CASCADE');
    table.dateTime('starting_at').notNullable();
    table.specificType('age_category', 'age_level').notNullable();
    table.specificType('duration', 'class_duration');
    table.integer('enrollment_count').unsigned().defaultTo(0);
    table.integer('max_enrollment').unsigned().defaultTo(10);
    table.timestamp('created_at').defaultTo(knex.fn.now());
    table.timestamp('updated_at').defaultTo(knex.fn.now());
    table.boolean('is_deleted').defaultTo('false');
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable('class_appointment');
}
