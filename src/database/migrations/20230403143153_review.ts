import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('review', (table) => {
    table.increments('id').primary();
    table.integer('class_id').unsigned().references('id').inTable('class');
    table.string('title').notNullable();
    table.text('body').notNullable();
    table.timestamp('created_at').defaultTo(knex.fn.now());
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable('review');
}
