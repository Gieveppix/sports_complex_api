import { db } from '$/src/database/db.js';
import { UserId, User } from '$/src/interface/types/user.type.js';
import { ClassId } from '$/src/interface/types/class.type.js';
import { AppointmentId } from '$/src/interface/types/appointment.type.js';

export async function createUser(user: Partial<User>) {
  return await db.table('user').insert(user);
}

export async function updateUser(id: UserId, user: Partial<User>) {
  return await db.table('user').where({ id }).update(user);
}

export async function findUserByEmail(email: string) {
  return await db('user').select('*').where('email', '=', email);
}

export async function findUserByTokenAndVerify(token: string) {
  return await db('user')
    .update({ is_email_verified: true })
    .where({ verification_token: token });
}

export async function findUserById(id: UserId) {
  return await db('user')
    .select(
      'id',
      'email',
      'first_name',
      'last_name',
      'age_category',
      'is_admin',
      'created_at'
    )
    .where({ id });
}

export async function getAllUsers() {
  return await db('user').select(
    'id',
    'email',
    'first_name',
    'last_name',
    'age_category',
    'is_admin',
    'created_at'
  );
}

export async function userAlreadyEnroledInClass(
  user_id: string,
  class_id: string
) {
  return await db('user_with_class')
    .where('user_id', user_id)
    .andWhere('class_id', class_id)
    .select();
}

export async function numberOfUserClasses(user_id: string) {
  const classCount = await db('user_with_class')
    .where('user_id', user_id)
    .count('* as classCount');
  return Number(classCount[0].classCount);
}

export async function enrollUserInClass(user_id: string, class_id: string) {
  await db('user_with_class').insert({
    user_id: user_id,
    class_id: class_id,
  });
  const enrolledUser = await userAlreadyEnroledInClass(user_id, class_id);
  return enrolledUser.length > 0 ? 1 : 0;
}

export async function userAgeCategory(userId: UserId) {
  const result = await db('user').select('age_category').where({ id: userId });
  return result[0]?.age_category;
}

export async function appointmentAgeCategory(appointmentId: AppointmentId) {
  const result = await db('class_appointment')
    .select('age_category')
    .where({ id: appointmentId });
  return result[0]?.age_category;
}

export async function userAlreadyEnroledAppointment(
  user_id: number,
  appointment_id: number
) {
  return await db('class_appointment_with_user')
    .where('user_id', user_id)
    .andWhere('class_appointment_id', appointment_id)
    .select();
}

export async function isUserEnrolledInClassAppointment(
  user_id: UserId,
  appointment_id: AppointmentId
) {
  const appointmentClass = await db('class_appointment')
    .select('class_id')
    .where({ id: appointment_id });
  if (appointmentClass.length) {
    const matchingClassId = await db('user_with_class')
      .select('class_id')
      .where({ user_id });
    // eslint-disable-next-line prefer-const
    for (let item in matchingClassId) {
      if (matchingClassId[item].class_id) {
        return true;
      }
    }
    return false;
  }
  return false;
}

export async function isAppointmentFull(appointment_id: AppointmentId) {
  const result = await db('class_appointment')
    .select('enrollment_count', 'max_enrollment')
    .where({ id: appointment_id });
  console.log('MALA ZAJEBANCIJA', result);

  if (result.length) {
    const enrollment_count = result[0].enrollment_count;
    const max_enrollment = result[0].max_enrollment;

    if (enrollment_count >= max_enrollment) {
      return true;
    } else {
      return false;
    }
  }
  return false;
}

export async function enrollUserInAppointment(
  userId: UserId,
  appointmentId: AppointmentId
) {
  await db('class_appointment_with_user').insert({
    user_id: userId,
    class_appointment_id: appointmentId,
  });
  const enrolledUser = await db('class_appointment_with_user')
    .where('user_id', userId)
    .andWhere('class_appointment_id', appointmentId)
    .select();

  return enrolledUser.length > 0 ? 1 : 0;
}

export async function unenrollUserFromClass(userId: UserId, classId: ClassId) {
  return await db('user_with_class')
    .where({
      user_id: userId,
      class_id: classId,
    })
    .del();
}

export async function unenrollUserFromAppointment(
  userId: UserId,
  appointmentId: AppointmentId
) {
  return await db('class_appointment_with_user')
    .where({
      user_id: userId,
      class_appointment_id: appointmentId,
    })
    .del();
}
