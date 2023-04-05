import { Request, Response } from 'express';
import { unregisterAppointment } from '$/src/controller/users/user.dao.js';

export async function unregisterAppointmentController(
  request: Request,
  response: Response
): Promise<void> {
  const res = await unregisterAppointment(request.body);
  response.status(res.responseCode).send({ data: res });
}
