import { Request, Response } from 'express';
import { deleteAppointment } from './appointment.dao.js';

export async function deleteAppointmentController(
  request: Request,
  response: Response
): Promise<void> {
  const res = await deleteAppointment(request.params.id);

  console.log('DASKDKAKDKAS', res);

  response.status(res.responseCode).send(res.message);
}
