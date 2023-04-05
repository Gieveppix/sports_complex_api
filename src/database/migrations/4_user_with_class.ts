import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('user_with_class', (table) => {
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
    table.timestamp('created_at').defaultTo(knex.fn.now());

    table.index(['user_id', 'class_id']);
  });

  // Trigger function to enforce a maximum of 2 classes per user
  await knex.raw(`
    CREATE OR REPLACE FUNCTION check_class_limit()
    RETURNS TRIGGER AS $$
    DECLARE
      class_count INTEGER;
    BEGIN
      SELECT COUNT(*) INTO class_count
      FROM user_with_class
      WHERE user_id = NEW.user_id;

      IF class_count >= 2 THEN
        RAISE EXCEPTION 'User has already enrolled in 2 classes';
      END IF;

      RETURN NEW;
    END;
    $$ LANGUAGE plpgsql;
  `);

  // Add the trigger to the 'user_with_class' table
  await knex.raw(`
    CREATE TRIGGER check_class_limit_trigger
    BEFORE INSERT ON user_with_class
    FOR EACH ROW
    EXECUTE FUNCTION check_class_limit();
  `);
}

export async function down(knex: Knex): Promise<void> {
  // Drop the trigger and function
  await knex.raw(`
    DROP TRIGGER IF EXISTS check_class_limit_trigger ON user_with_class;
    DROP FUNCTION IF EXISTS check_class_limit();
  `);

  // Drop the table
  await knex.schema.dropTable('user_with_class');
}
