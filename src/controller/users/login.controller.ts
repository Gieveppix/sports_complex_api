import { Request, Response } from 'express';
import { loginUser } from './user.dao.js';
import { ValidationError, validationResult } from 'express-validator';
import { User } from '$/src/controller/users/user.type.js';

export async function loginUserController(
  request: Request,
  response: Response
): Promise<void> {
  const errors = validationResult(request);

  const user: Pick<User, 'email' | 'password'> = {
    email: request.body.email,
    password: request.body.password,
  };

  const res = await loginUser(user);

  if (!errors.isEmpty()) {
    response.status(422).send(errors.errors[0].msg as ValidationError);
  } else {
    response.status(res.responseCode).send(res.message);
  }
}
