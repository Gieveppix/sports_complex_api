import { Request, Response } from 'express';
import { validationResult, ValidationError } from 'express-validator';
import { createAppointmentService } from '$/src/service/appointment.service.js';

export async function createAppointmentController(
  request: Request,
  response: Response
): Promise<void> {
  const res = await createAppointmentService(request.body);

  const validationResultObject = validationResult(request);
  const errors = validationResultObject.array();

  if (errors[0]) {
    response.status(422).send(errors[0].msg as ValidationError);
  } else if (!res || res.response === undefined) {
    response.status(res.responseCode).json(res.message);
  } else {
    response
      .status(res.response.responseCode)
      .json({ data: res.user, message: res.response.message });
  }
}
