import { Request, Response } from 'express';
import { loginUser } from '$/src/controller/users/user.dao.js';
import { validationResult } from 'express-validator';
import { User } from '$/src/controller/users/user.type.js';

export async function loginUserController(
  request: Request,
  response: Response
): Promise<void> {
  const errors = validationResult(request);

  if (!errors.isEmpty()) {
    response.status(422).send(errors.errors[0].msg);
    return;
  }

  const user: Pick<User, 'email' | 'password'> = {
    email: request.body.email,
    password: request.body.password,
  };

  const res = await loginUser(user);

  response.status(res.responseCode).send(res.message);
}
