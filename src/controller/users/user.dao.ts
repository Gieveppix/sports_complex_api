/* eslint-disable @typescript-eslint/no-explicit-any */ // TODO: fix any
import { db } from '$/src/database/db.js';
import { UserId, User } from '$/src/controller/users/user.type.js';
import { ClassId } from '$/src/controller/classes/class.type.js';
import { getCurrentTimestamp } from '$/src/helpers/timestamp.js';
import * as bcrypt from 'bcrypt';
import { AppointmentId } from '../appointments/appointment.type.js';

type Response = {
  responseCode: number;
  message: string;
};
let response: Response = {
  responseCode: 500,
  message: 'Server error',
};

export async function registerUser(
  user: Omit<
    User,
    'id' | 'is_admin' | 'created_at' | 'updated_at' | 'is_deleted'
  >
): Promise<Response> {
  const saltRounds = 10;
  const hash = await bcrypt.hash(user.password, saltRounds);

  return await db
    .table('user')
    .insert({
      email: user.email,
      password: hash,
      first_name: user.first_name,
      last_name: user.last_name,
      age_category: user.age_category,
    })
    .then((data) => {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      if (data.severity === 'ERROR') {
        return response;
      } else {
        response = {
          responseCode: 200,
          message: 'Register ok',
        };
        return response;
      }
    })
    .catch((error) => {
      if (error.constraint === 'user_email_unique') {
        response = {
          responseCode: 409,
          message: 'Email already exists',
        };
        return response;
      } else {
        response = {
          responseCode: 400,
          message: 'Unable to register',
        };
        return response;
      }
    });
}

export async function loginUser(
  user: Pick<User, 'email' | 'password'>
): Promise<Response> {
  return await db('user')
    .select('email', 'password')
    .where('email', '=', user.email)
    .then(async (data) => {
      const isValid = await bcrypt.compare(user.password, data[0].password);

      if (isValid) {
        return db('user')
          .select('email', 'first_name', 'last_name', 'age_category')
          .where('email', '=', user.email)
          .then((user) => {
            response = {
              responseCode: 200,
              message: user[0],
            };
            return response;
          })
          .catch((error) => {
            response = {
              responseCode: 400,
              message: 'Unable to login',
            };
            return response;
          });
      } else {
        response = {
          responseCode: 400,
          message: 'Wrong email or password',
        };
        return response;
      }
    })
    .catch((error) => {
      response = {
        responseCode: 400,
        message: 'Wrong email or password',
      };
      return response;
    });
}

export async function getAllUsers(): Promise<{
  user: any[];
  response: Response;
}> {
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
    .then((user) => {
      response = {
        responseCode: 200,
        message: 'Users returned successfully',
      };
      return {
        user: user,
        response: response,
      };
    });
}

export async function getUserById(
  id: string
): Promise<{ user: any[]; response: Response }> {
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
    .where({ id })
    .then((user) => {
      response = {
        responseCode: 200,
        message: `User with id:${id}`,
      };
      return {
        user: user,
        response: response,
      };
    });
}

export async function updateUser(id: string, userData: User): Promise<any> {
  try {
    userData.updated_at = getCurrentTimestamp();
    if ('password' in userData) {
      const saltRounds = 10;
      userData.password = await bcrypt.hash(userData.password, saltRounds);
    }

    const updatedRows = await db('user')
      .select(
        'id',
        'email',
        'first_name',
        'last_name',
        'age_category',
        'is_admin',
        'created_at'
      )
      .where({ id })
      .update(userData);
    if (updatedRows === 0) {
      response = {
        responseCode: 404,
        message: 'User not found',
      };
      return response;
    } else {
      response = {
        responseCode: 200,
        message: 'User updated succesfully',
      };
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password, ...userDataWithoutPassword } = userData;
      return {
        user: userDataWithoutPassword,
        response: response,
      };
    }
  } catch (error) {
    return response;
  }
}

export async function registerClass(body: {
  user_id: UserId;
  class_id: ClassId;
}): Promise<Response> {
  try {
    // Check if the user is already enrolled in the class
    const isAlreadyEnrolled = await db('user_with_class')
      .where({
        user_id: body.user_id,
        class_id: body.class_id,
      })
      .first();

    if (isAlreadyEnrolled) {
      response = {
        responseCode: 400,
        message: 'User is already enrolled in this class',
      };
      return response;
    }

    // Check the current number of enrolled classes for the user
    const enrolledClassesCount = await db('user_with_class')
      .count('* as count')
      .where('user_id', body.user_id)
      .first();

    if (enrolledClassesCount) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      if (enrolledClassesCount.count >= 2) {
        response = {
          responseCode: 400,
          message: 'User can enroll in a maximum of two classes',
        };
        return response;
      }
    }

    // Enroll user in the class
    await db('user_with_class').insert({
      user_id: body.user_id,
      class_id: body.class_id,
    });

    response = {
      responseCode: 200,
      message: 'User enrolled in the class successfully',
    };
    return response;
  } catch (error) {
    response = {
      responseCode: 500,
      message: 'Server error',
    };
    return response;
  }
}

export async function registerAppointment(body: {
  user_id: UserId;
  appointment_id: AppointmentId;
}): Promise<Response> {
  try {
    // Check if the user is already enrolled in the class appointment
    const isAlreadyEnrolledInAppointment = await db(
      'class_appointment_with_user'
    )
      .where({
        user_id: body.user_id,
        class_appointment_id: body.appointment_id,
      })
      .first();

    if (isAlreadyEnrolledInAppointment) {
      response = {
        responseCode: 400,
        message: 'User is already enrolled in this class appointment',
      };
      return response;
    }
    // Check if the user's age_category matches the class_appointment's age_category
    const [user, appointment] = await Promise.all([
      db('user').select('age_category').where('id', body.user_id).first(),
      db('class_appointment')
        .select(
          'class_id',
          'age_category',
          'enrollment_count',
          'max_enrollment'
        )
        .where('id', body.appointment_id)
        .first(),
    ]);

    const isEnrolledInClass = await db('user_with_class')
      .where({
        user_id: body.user_id,
        class_id: appointment.class_id,
      })
      .first();

    if (!isEnrolledInClass) {
      response = {
        responseCode: 403,
        message:
          'User is not enrolled in the class associated with the appointment',
      };
      return response;
    }

    if (!user || !appointment) {
      response = {
        responseCode: 404,
        message: 'User or class appointment not found',
      };
      return response;
    }

    if (user.age_category !== appointment.age_category) {
      response = {
        responseCode: 403,
        message:
          'User age category does not match class appointment age category',
      };
      return response;
    }

    if (appointment.enrollment_count >= appointment.max_enrollment) {
      response = {
        responseCode: 400,
        message: 'Class appointment is full',
      };
      return response;
    }

    // Register user for the class appointment
    await db('class_appointment_with_user').insert({
      user_id: body.user_id,
      class_appointment_id: body.appointment_id,
    });

    // Increment the enrollment_count
    await db('class_appointment')
      .where('id', body.appointment_id)
      .increment('enrollment_count', 1);

    response = {
      responseCode: 200,
      message: 'User registered for the class appointment successfully',
    };
    return response;
  } catch (error) {
    response = {
      responseCode: 500,
      message: 'Server error',
    };
    return response;
  }
}

// TODO: implemet delete so that only the admin and user(self)
// export async function deleteUser(id: string): Promise<any> {}
