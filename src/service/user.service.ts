import * as bcrypt from 'bcrypt';
import { v4 as uuidv4 } from 'uuid';
import { sendVerificationEmail } from '$/src/middleware/mail.js';
import {
  createUser,
  updateUser,
  findUserByEmail,
  findUserById,
  getAllUsers,
  enrollUserInClass,
  enrollUserInAppointment,
  unenrollUserFromClass,
  unenrollUserFromAppointment,
  findUserByTokenAndVerify,
  userAgeCategory,
  appointmentAgeCategory,
  isAppointmentFull,
  userAlreadyEnroledAppointment,
  numberOfUserClasses,
  userAlreadyEnroledInClass,
  isUserEnrolledInClassAppointment,
} from '$/src/dao/user.dao.js';
// import { getCurrentTimestamp } from '$/src/helpers/timestamp.js';
import { generateToken } from '$/src/middleware/generate-token.js';
import { User, UserId } from '$/src/interface/types/user.type.js';
import { ClassId } from '$/src/interface/types/class.type.js';
import { AppointmentId } from '$/src/interface/types/appointment.type.js';
import { getClassByIdData } from '../dao/class.dao.js';

type Response = {
  responseCode: number;
  message: string | object;
};
const response: Response = {
  responseCode: 500,
  message: 'Server error',
};

export async function registerUserService(
  user: Pick<
    User,
    'email' | 'password' | 'first_name' | 'last_name' | 'age_category'
  >
) {
  const existingUser = await findUserByEmail(user.email);
  if (existingUser.length > 0) {
    response.responseCode = 400;
    response.message = 'Email already exists';
    return response;
  }

  const verificationToken = uuidv4();
  const hashedPassword = await bcrypt.hash(user.password, 10);
  const newUser = {
    ...user,
    password: hashedPassword,
    verification_token: verificationToken,
  };

  await createUser(newUser);
  await sendVerificationEmail(newUser.email, verificationToken);

  response.responseCode = 201;
  response.message = 'User created successfully. Verification email sent.';
  return response;
}

export async function loginUserService(email: string, password: string) {
  const user = await findUserByEmail(email);

  if (user.length === 0) {
    response.responseCode = 404;
    response.message = 'User not found';
    return response;
  }

  const isPasswordValid = await bcrypt.compare(password, user[0].password);
  if (!isPasswordValid) {
    response.responseCode = 401;
    response.message = 'Invalid password';
    return response;
  }

  response.responseCode = 200;
  response.message = {
    id: user[0].id,
    email: user[0].email,
    first_name: user[0].first_name,
    last_name: user[0].last_name,
    age_category: user[0].age_category,
    is_admin: user[0].is_admin,
    token: generateToken(user[0].id),
  };
  return response;
}

export async function getUserByIdService(id: UserId) {
  const user = await findUserById(id);
  if (user.length === 0) {
    response.responseCode = 404;
    response.message = 'User not found';
    return response;
  }

  response.responseCode = 200;
  response.message = user[0];
  return response;
}

export async function getUsersService() {
  const users = await getAllUsers();
  response.responseCode = 200;
  response.message = users;
  return response;
}

export async function verifyEmailService(token: string) {
  try {
    const result = await findUserByTokenAndVerify(token);

    if (result === 0) {
      return {
        responseCode: 400,
        message: 'Invalid verification token',
      };
    }

    return {
      responseCode: 200,
      message: 'Email successfully verified',
    };
  } catch (error) {
    console.log(error);

    return {
      responseCode: 400,
      message: 'Unable to verify email',
    };
  }
}

export async function updateUserService(
  id: UserId,
  updatedUser: Partial<User>
) {
  const existingUser = await findUserById(id);
  if (existingUser.length === 0) {
    response.responseCode = 404;
    response.message = 'User not found';
    return response;
  }
  await updateUser(id, updatedUser);
  response.responseCode = 200;
  response.message = 'User updated successfully';
  return response;
}

export async function enrollUserToClassService(
  user_id: string,
  class_id: string
) {
  const user_exists = await findUserById(Number(user_id));
  const class_exists = await getClassByIdData(class_id);

  if (user_exists.length && class_exists) {
    const classCount = await numberOfUserClasses(user_id);
    const isEnrolled = await userAlreadyEnroledInClass(user_id, class_id);

    if (classCount < 2) {
      if (isEnrolled.length === 0) {
        const affectedRows = await enrollUserInClass(user_id, class_id);

        if (affectedRows === 0) {
          response.responseCode = 400;
          response.message = 'Failed to enroll user in class';
          return response;
        }

        response.responseCode = 200;
        response.message = 'User enrolled in class successfully';
        return response;
      }
      response.responseCode = 400;
      response.message =
        'Failed to enroll user in class, user is already enrolled ';
      return response;
    }
    response.responseCode = 400;
    response.message =
      'Failed to enroll user in class, user is already enrolled in the maximum of two classes';
    return response;
  }
  response.responseCode = 400;
  response.message =
    'Failed to enroll user in class, the user or class dont exist';
  return response;
}

export async function enrollUserToAppointmentService(
  userId: UserId,
  appointmentId: AppointmentId
) {
  const isUserInClass = await isUserEnrolledInClassAppointment(
    userId,
    appointmentId
  );
  const isFull = await isAppointmentFull(appointmentId);
  const alreadyInAppointment = await userAlreadyEnroledAppointment(
    userId,
    appointmentId
  );
  const userAge = await userAgeCategory(userId);
  const appointmentAge = await appointmentAgeCategory(appointmentId);

  if (isUserInClass) {
    if (!isFull) {
      if (alreadyInAppointment.length === 0) {
        if (userAge === appointmentAge) {
          const affectedRows = await enrollUserInAppointment(
            userId,
            appointmentId
          );
          if (affectedRows === 0) {
            response.responseCode = 400;
            response.message = 'Failed to enroll user in appointment';
            return response;
          }

          response.responseCode = 200;
          response.message = 'User enrolled in appointment successfully';
          return response;
        }
        response.responseCode = 400;
        response.message =
          'Failed to enroll user in appointment, user and appointment age_category does not match';
        return response;
      }
      response.responseCode = 400;
      response.message =
        'Failed to enroll user in appointment, user already enrolled';
      return response;
    }
    response.responseCode = 400;
    response.message =
      'Failed to enroll user in appointment, appointment is full';
    return response;
  }
  response.responseCode = 400;
  response.message =
    'Failed to enroll user in appointment, user is not in the class';
  return response;
}

export async function unenrollUserFromClassService(
  userId: UserId,
  classId: ClassId
) {
  console.log('MEOWWWW', userId, classId);

  const affectedRows = await unenrollUserFromClass(userId, classId);
  if (affectedRows === 0) {
    response.responseCode = 400;
    response.message = 'Failed to unenroll user from class';
    return response;
  }

  response.responseCode = 200;
  response.message = 'User unenrolled from class successfully';
  return response;
}

export async function unenrollUserFromAppointmentService(
  userId: UserId,
  appointmentId: AppointmentId
) {
  const affectedRows = await unenrollUserFromAppointment(userId, appointmentId);
  if (affectedRows === 0) {
    response.responseCode = 400;
    response.message = 'Failed to unenroll user from appointment';
    return response;
  }

  response.responseCode = 200;
  response.message = 'User unenrolled from appointment successfully';
  return response;
}
