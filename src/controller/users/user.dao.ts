/* eslint-disable @typescript-eslint/no-explicit-any */ // TODO: fix any
import { db } from '$/src/database/db.js';
import { User } from './user.type.js';
import { getCurrentTimestamp } from '../../helpers/timestamp.js';
import * as bcrypt from 'bcrypt';

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

// TODO: implemet delete so that only the admin and user(self)
// export async function deleteUser(id: string): Promise<any> {}
