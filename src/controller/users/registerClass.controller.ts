import { Request, Response } from 'express';
import { ValidationError, validationResult } from 'express-validator';
import { enrollUserToClassService } from '$/src/service/user.service.js';

export async function registerClassController(
  request: Request,
  response: Response
): Promise<void> {
  const errors = validationResult(request);

  const { user_id, class_id } = request.body;
  console.log(user_id, class_id);

  if (!errors.isEmpty()) {
    // response.status(422).send(errors.errors[0].msg as ValidationError);
    response.status(400).send('ldlslad');
  } else {
    const res = await enrollUserToClassService(user_id, class_id);
    response.status(res.responseCode).send({ data: res });
  }
}
