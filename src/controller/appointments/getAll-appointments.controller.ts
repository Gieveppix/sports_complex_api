import { Request, Response } from 'express';
import { getAllAppointments } from '$/src/controller/appointments/appointment.dao.js';

export async function getAllAppointmentsController(
  request: Request,
  response: Response
): Promise<void> {
  const res = await getAllAppointments();

  response
    .status(res.response.responseCode)
    .send({ data: res.data, response: res.response.message });
}
