import { Request, Response } from 'express';
import { validationResult, ValidationError } from 'express-validator';
import { updateClassService } from '$/src/service/class.service.js';

export async function updateClassController(
  request: Request,
  response: Response
): Promise<void> {
  const res = await updateClassService(request.params.id, request.body);

  const errors = validationResult(request);

  if (!errors.isEmpty()) {
    // response.status(422).send(errors.errors[0].msg as ValidationError);
    response.status(400).send('ldlslad');
  } else {
    response.status(res.responseCode).send(res.message);
  }
}
