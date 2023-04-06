import { Request, Response } from 'express';
import { registerUser } from '$/src/controller/users/user.dao.js';
import { ValidationError, validationResult } from 'express-validator';
import { User } from '$/src/interface/types/user.type.js';

export async function registerUserController(
  request: Request,
  response: Response
): Promise<void> {
  const errors = validationResult(request);

  const user: Omit<
    User,
    | 'id'
    | 'is_admin'
    | 'created_at'
    | 'updated_at'
    | 'is_deleted'
    | 'is_email_verified'
    | 'verification_token'
  > = {
    email: request.body.email,
    password: request.body.password,
    first_name: request.body.first_name,
    last_name: request.body.last_name,
    age_category: request.body.age_category,
  };
  const res = await registerUser(user);

  if (!errors.isEmpty()) {
    response.status(422).send(errors.errors[0].msg as ValidationError);
  } else {
    response.status(res.responseCode).send(res.message);
  }
}
