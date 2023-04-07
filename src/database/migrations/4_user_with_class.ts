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

  await knex.raw(`
    CREATE TRIGGER check_class_limit_trigger
    BEFORE INSERT ON user_with_class
    FOR EACH ROW
    EXECUTE FUNCTION check_class_limit();
  `);

  // Trigger to delete row in class_appointment_with_user, when matchin user_id and class_id
  await knex.raw(`
  CREATE OR REPLACE FUNCTION delete_class_appointments()
  RETURNS TRIGGER AS $$
  BEGIN
    DELETE FROM class_appointment_with_user
    WHERE user_id = OLD.user_id AND class_appointment_id = OLD.class_id;

    RETURN OLD;
  END;
  $$ LANGUAGE plpgsql;
`);

  await knex.raw(`
  CREATE TRIGGER delete_class_appointments_trigger
  AFTER DELETE ON user_with_class
  FOR EACH ROW
  EXECUTE FUNCTION delete_class_appointments();
`);
}

export async function down(knex: Knex): Promise<void> {
  await knex.raw(`
  DROP TRIGGER IF EXISTS delete_class_appointments_trigger ON user_with_class;
  DROP FUNCTION IF EXISTS delete_class_appointments();
`);

  await knex.raw(`
  DROP TRIGGER IF EXISTS check_class_limit_trigger ON user_with_class;
  DROP FUNCTION IF EXISTS check_class_limit();
`);

  await knex.schema.dropTable('user_with_class');
}
