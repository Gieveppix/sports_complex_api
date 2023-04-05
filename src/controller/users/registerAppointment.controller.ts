import { Request, Response } from 'express';
import { registerAppointment } from '$/src/controller/users/user.dao.js';

export async function registerAppointmentController(
  request: Request,
  response: Response
): Promise<void> {
  const res = await registerAppointment(request.body);
  response.status(res.responseCode).send({ data: res });
}
