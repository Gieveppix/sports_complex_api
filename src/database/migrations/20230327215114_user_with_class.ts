import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('user_with_class', (table) => {
    table.increments('id').primary();
    table.integer('user_id').unsigned().references('id').inTable('user');
    table.integer('class_id').unsigned().references('id').inTable('class');
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable('user_with_class');
}
