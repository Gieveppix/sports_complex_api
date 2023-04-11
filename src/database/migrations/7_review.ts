import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('review', (table) => {
    table.increments('id').primary();
    table
      .integer('user_id')
      .unsigned()
      .references('id')
      .inTable('user')
      .onDelete('CASCADE');
    table
      .integer('class_id')
      .unsigned()
      .references('id')
      .inTable('class')
      .onDelete('CASCADE');
    table.string('title').notNullable();
    table.text('body').notNullable();
    table.decimal('grade', 2, 1).notNullable();
    table.timestamp('created_at').defaultTo(knex.fn.now());
    table.timestamp('updated_at').defaultTo(knex.fn.now());

    table.index('user_id', 'class_id');
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable('review');
}
