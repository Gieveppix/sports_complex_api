import { Request, Response } from 'express';
import { unenrollUserFromAppointmentService } from '$/src/service/user.service.js';

export async function unregisterAppointmentController(
  request: Request,
  response: Response
): Promise<void> {
  const { user_id, appointment_id } = request.body;

  const res = await unenrollUserFromAppointmentService(user_id, appointment_id);
  response.status(res.responseCode).send({ data: res });
}
