import { Request, Response } from 'express';
import { getAppointmentById } from '$/src/controller/appointments/appointment.dao.js';

export async function getAppointmentByIdController(
  request: Request,
  response: Response
): Promise<void> {
  const res = await getAppointmentById(request.params.id);

  response
    .status(res.response.responseCode)
    .send({ data: res.data, message: res.response.message });
}
