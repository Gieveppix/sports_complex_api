import { Request, Response } from 'express';
import { registerAppointment } from '$/src/controller/users/user.dao.js';
import { ValidationError, validationResult } from 'express-validator';

export async function registerAppointmentController(
  request: Request,
  response: Response
): Promise<void> {
  const errors = validationResult(request);

  const res = await registerAppointment(request.body);

  if (!errors.isEmpty()) {
    response.status(422).send(errors.errors[0].msg as ValidationError);
  } else {
    response.status(res.responseCode).send({ data: res });
  }
}
