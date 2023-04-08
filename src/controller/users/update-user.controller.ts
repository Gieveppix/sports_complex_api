import { Request, Response } from 'express';
import { ValidationError, validationResult } from 'express-validator';
import { updateUserService } from '$/src/service/user.service.js';

export async function updateUserController(
  request: Request,
  response: Response
): Promise<void> {
  const validationResultObject = validationResult(request);
  const errors = validationResultObject.array();

  const res = await updateUserService(Number(request.params.id), request.body);

  if (!errors.length) {
    response.status(422).send(errors[0].msg as ValidationError);
  } else {
    response.status(res.responseCode).json(res.message);
  }
}
