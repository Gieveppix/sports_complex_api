import { Request, Response } from 'express';
import { getAllAppointmentsService } from '$/src/service/appointment.service.js';

export async function getAllAppointmentsController(
  request: Request,
  response: Response
): Promise<void> {
  const { name, age } = request.query;

  const filter = {
    name: typeof name === 'string' ? name.split(',') : undefined,
    age: typeof age === 'string' ? age : undefined,
  };

  const res = await getAllAppointmentsService(filter);

  response
    .status(res.response.responseCode)
    .send({ data: res.data, response: res.response.message });
}
