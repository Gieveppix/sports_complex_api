import { Request, Response } from 'express';
import { registerClass } from '$/src/controller/users/user.dao.js';
import { ValidationError, validationResult } from 'express-validator';

export async function registerClassController(
  request: Request,
  response: Response
): Promise<void> {
  const errors = validationResult(request);

  const res = await registerClass(request.body);
  if (!errors.isEmpty()) {
    response.status(422).send(errors.errors[0].msg as ValidationError);
  } else {
    response.status(res.responseCode).send({ data: res });
  }
}
