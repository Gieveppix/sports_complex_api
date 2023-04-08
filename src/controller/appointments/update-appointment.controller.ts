import { Request, Response } from 'express';
import { validationResult, ValidationError } from 'express-validator';
import { updateAppointmentService } from '$/src/service/appointment.service.js';

export async function updateAppointmentController(
  request: Request,
  response: Response
): Promise<void> {
  const res = await updateAppointmentService(
    Number(request.params.id),
    request.body
  );

  const validationResultObject = validationResult(request);
  const errors = validationResultObject.array();

  if (!errors.length) {
    response.status(422).send(errors[0].msg as ValidationError);
  } else if (res.response === undefined) {
    response.status(res.responseCode).json(res.message);
  } else {
    response
      .status(res.response.responseCode)
      .json({ data: res.user, message: res.response.message });
  }
}
