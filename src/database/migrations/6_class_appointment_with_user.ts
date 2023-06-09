import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('class_appointment_with_user', (table) => {
    table.increments('id').primary();
    table
      .integer('user_id')
      .unsigned()
      .references('id')
      .inTable('user')
      .onDelete('CASCADE');
    table
      .integer('class_appointment_id')
      .unsigned()
      .references('id')
      .inTable('class_appointment')
      .onDelete('CASCADE');
    table.timestamp('created_at').defaultTo(knex.fn.now());
    table.timestamp('updated_at').defaultTo(knex.fn.now());

    table.index(['user_id', 'class_appointment_id']);
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable('class_appointment_with_user');
}
