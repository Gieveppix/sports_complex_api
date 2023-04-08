import { Request, Response } from 'express';
import { ValidationError, validationResult } from 'express-validator';
import { enrollUserToClassService } from '$/src/service/user.service.js';

export async function registerClassController(
  request: Request,
  response: Response
): Promise<void> {
  const validationResultObject = validationResult(request);
  const errors = validationResultObject.array();

  const { user_id, class_id } = request.body;
  console.log(user_id, class_id);

  if (!errors.length) {
    response.status(422).send(errors[0].msg as ValidationError);
  } else {
    const res = await enrollUserToClassService(user_id, class_id);
    response.status(res.responseCode).send({ data: res });
  }
}
