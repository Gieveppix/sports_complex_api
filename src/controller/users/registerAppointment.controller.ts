import { Request, Response } from 'express';
import { ValidationError, validationResult } from 'express-validator';
import { enrollUserToAppointmentService } from '$/src/service/user.service.js';

export async function registerAppointmentController(
  request: Request,
  response: Response
): Promise<void> {
  const validationResultObject = validationResult(request);
  const errors = validationResultObject.array();

  const { user_id, appointment_id } = request.body;

  const res = await enrollUserToAppointmentService(user_id, appointment_id);

  if (!errors.length) {
    response.status(422).send(errors[0].msg as ValidationError);
  } else {
    response.status(res.responseCode).send({ data: res });
  }
}
