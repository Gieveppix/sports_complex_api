import { db } from '$/src/database/db.js';
import { Class } from '$/src/interface/types/class.type.js';

export async function createClassData(
  classData: Omit<Class, 'id' | 'created_at' | 'updated_at'>
) {
  return await db.table('class').insert(classData);
}

export async function getAllClasses() {
  return await db.table('class').select('*');
}

export async function getClassByIdData(id: string) {
  return await db.table('class').select('*').where({ id }).first();
}

export async function getClassAppointments(id: string) {
  return await db
    .table('class_appointment')
    .select('*')
    .where({ class_id: id });
}

export async function updateClassData(id: string, classData: Class) {
  return await db.table('class').select('*').where({ id }).update(classData);
}
