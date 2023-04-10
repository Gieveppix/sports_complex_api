import { Request, Response } from 'express';
import { ValidationError, validationResult } from 'express-validator';
import { User } from '$/src/interface/types/user.type.js';
import { registerUserService } from '$/src/service/user.service.js';

export async function registerUserController(
  request: Request,
  response: Response
): Promise<void> {
  const validationResultObject = validationResult(request);
  const errors = validationResultObject.array();

  if (errors[0]) {
    response.status(422).send(errors[0].msg as ValidationError);
  } else {
    const user: Pick<
      User,
      'email' | 'password' | 'first_name' | 'last_name' | 'age_category'
    > = {
      email: request.body.email,
      password: request.body.password,
      first_name: request.body.first_name,
      last_name: request.body.last_name,
      age_category: request.body.age_category,
    };

    const res = await registerUserService(user);
    response.status(res.responseCode).send(res.message);
  }
}
