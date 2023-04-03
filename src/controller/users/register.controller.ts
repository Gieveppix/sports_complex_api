import { Request, Response } from 'express';
import { registerUser } from './user.dao.js';
import { ValidationError, validationResult } from 'express-validator';
import { User } from '$/src/controller/users/user.type.js';

export async function registerUserController(
  request: Request,
  response: Response
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
): Promise<any> {
  console.log(request.body);
  const errors = validationResult(request);

  const user: Omit<User, 'id' | 'is_admin' | 'created_at'> = {
    email: request.body.email,
    password: request.body.password,
    first_name: request.body.first_name,
    last_name: request.body.last_name,
    age_category: request.body.age_category,
  };
  const res = await registerUser(user);

  if (!errors.isEmpty()) {
    return response.status(422).send(errors.errors[0].msg as ValidationError);
  } else {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    response.status(res.responseCode).send(res.message);
  }
}
