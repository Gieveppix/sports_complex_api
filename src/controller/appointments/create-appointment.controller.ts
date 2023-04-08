import { Request, Response } from 'express';
import { validationResult, ValidationError } from 'express-validator';
import { createAppointmentService } from '$/src/service/appointment.service.js';

export async function createAppointmentController(
  request: Request,
  response: Response
): Promise<void> {
  const res = await createAppointmentService(request.body);

  const errors = validationResult(request);

  if (!errors.isEmpty()) {
    // response.status(422).send(errors.errors[0].msg as ValidationError);
    response.status(400).send('ldlslad');
  } else if (!res || res.response === undefined) {
    response.status(res.responseCode).json(res.message);
  } else {
    response
      .status(res.response.responseCode)
      .json({ data: res.user, message: res.response.message });
  }
}
