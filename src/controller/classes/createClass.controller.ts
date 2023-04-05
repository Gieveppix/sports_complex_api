import { Request, Response } from 'express';
import { validationResult, ValidationError } from 'express-validator';
import { createClass } from '$/src/controller/classes/class.dao.js';

export async function createClassController(
  request: Request,
  response: Response
): Promise<void> {
  const res = await createClass(request.body);

  const errors = validationResult(request);

  if (!errors.isEmpty()) {
    response.status(422).send(errors.errors[0].msg as ValidationError);
  } else {
    response.status(res.responseCode).send(res.message);
  }
}
