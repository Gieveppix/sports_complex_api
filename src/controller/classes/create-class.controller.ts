import { Request, Response } from 'express';
import { validationResult, ValidationError } from 'express-validator';
import { createClassService } from '$/src/service/class.service.js';

export async function createClassController(
  request: Request,
  response: Response
): Promise<void> {
  const res = await createClassService(request.body);

  const validationResultObject = validationResult(request);
  const errors = validationResultObject.array();

  if (!errors.length) {
    response.status(422).send(errors[0].msg as ValidationError);
  } else {
    response.status(res.responseCode).send(res.message);
  }
}
