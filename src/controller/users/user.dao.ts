import { db } from '$/src/database/db.js';
import { User } from './user.type.js';
import * as bcrypt from 'bcrypt';

type res = {
  responseCode: number;
  message: string;
};
let response: res = {
  responseCode: 400,
  message: 'Unable to register',
};

export async function registerUser(
  user: Omit<User, 'id' | 'is_admin' | 'created_at'>
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
): Promise<any> {
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
        return response;
      }
    });
}
