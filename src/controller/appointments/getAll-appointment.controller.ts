import { Request, Response } from 'express';
import { getAllAppointments } from '$/src/controller/appointments/appointment.dao.js';

export async function getAllAppointmentsController(
  request: Request,
  response: Response
): Promise<void> {
  const { name, age } = request.query;

  const filter = {
    name: typeof name === 'string' ? name.split(',') : undefined,
    age: typeof age === 'string' ? age : undefined,
  };

  const res = await getAllAppointments(filter);

  response
    .status(res.response.responseCode)
    .send({ data: res.data, response: res.response.message });
}
