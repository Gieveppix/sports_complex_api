import { Request, Response } from 'express';
import { getClassById } from '$/src/service/class.service.js';

export async function getClassByIdController(
  request: Request,
  response: Response
): Promise<void> {
  const res = await getClassById(request.params.id);

  response
    .status(res.responseCode)
    .send({ data: res.data, message: res.message });
}
