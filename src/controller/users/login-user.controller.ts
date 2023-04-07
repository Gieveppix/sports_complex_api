import { Request, Response } from 'express';
import { validationResult } from 'express-validator';
import { User } from '$/src/interface/types/user.type.js';
import { loginUserService } from '$/src/service/user.service.js';

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

  const res = await loginUserService(user.email, user.password);

  response.status(res.responseCode).send(res.message);
}
