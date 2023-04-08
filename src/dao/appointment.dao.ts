import { db } from '$/src/database/db.js';

export async function classExists(class_id: number) {
  const class_exists = await db
    .table('class')
    .select('*')
    .where({ id: class_id });
  return class_exists.length > 0;
}

export async function create(appointment: any) {
  return await db
    .table('class_appointment')
    .where({ class_id: appointment.class_id })
    .insert(appointment);
}

export async function getAll(filter?: { name?: string[]; age?: string }) {
  let query = db.table('class_appointment').select('*');

  if (filter) {
    if (filter.name) {
      query = query
        .join('class', 'class.id', 'class_appointment.class_id')
        .whereIn('class.name', filter.name);
    }

    if (filter.age) {
      query = query.where({ age_category: filter.age });
    }
  }

  return await query;
}

export async function getById(id: number) {
  return await db.table('class_appointment').select('*').where({ id });
}

export async function update(id: number, appointmentData: any) {
  return await db
    .table('class_appointment')
    .select('*')
    .where({ id })
    .update(appointmentData);
}

export async function deleteById(id: number) {
  return await db
    .table('class_appointment')
    .where({ id })
    .update({ is_deleted: true });
}
