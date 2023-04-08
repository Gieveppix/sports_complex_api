import { Request, Response } from 'express';
import { ValidationError, validationResult } from 'express-validator';
import { enrollUserToAppointmentService } from '$/src/service/user.service.js';

export async function registerAppointmentController(
  request: Request,
  response: Response
): Promise<void> {
  const errors = validationResult(request);

  const { user_id, appointment_id } = request.body;

  const res = await enrollUserToAppointmentService(user_id, appointment_id);

  if (!errors.isEmpty()) {
    // response.status(422).send(errors.errors[0].msg as ValidationError);
    response.status(400).send('ldlslad');
  } else {
    response.status(res.responseCode).send({ data: res });
  }
}
