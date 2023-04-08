import { Request, Response } from 'express';
import { ValidationError, validationResult } from 'express-validator';
import { updateUserService } from '$/src/service/user.service.js';

export async function updateUserController(
  request: Request,
  response: Response
): Promise<void> {
  const errors = validationResult(request);
  const res = await updateUserService(Number(request.params.id), request.body);

  if (!errors.isEmpty()) {
    // response.status(422).send(errors.errors[0].msg as ValidationError);
    response.status(400).send('ldlslad');
  } else {
    response.status(res.responseCode).json(res.message);
  }
}
