import { Request, Response } from 'express';
import { getAppointmentByIdService } from '$/src/service/appointment.service.js';

export async function getAppointmentByIdController(
  request: Request,
  response: Response
): Promise<void> {
  const res = await getAppointmentByIdService(Number(request.params.id));

  response
    .status(res.response.responseCode)
    .send({ data: res.data, message: res.response.message });
}
