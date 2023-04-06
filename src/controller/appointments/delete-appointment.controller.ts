import { Request, Response } from 'express';
import { deleteAppointment } from '$/src/controller/appointments/appointment.dao.js';

export async function deleteAppointmentController(
  request: Request,
  response: Response
): Promise<void> {
  const res = await deleteAppointment(request.params.id);

  response.status(res.responseCode).send(res.message);
}
