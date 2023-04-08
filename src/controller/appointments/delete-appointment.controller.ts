import { Request, Response } from 'express';
import { deleteAppointmentService } from '$/src/service/appointment.service.js';

export async function deleteAppointmentController(
  request: Request,
  response: Response
): Promise<void> {
  const res = await deleteAppointmentService(Number(request.params.id));

  response.status(res.responseCode).send(res.message);
}
