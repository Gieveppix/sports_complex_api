import { Request, Response } from 'express';
import { getClassByIdService } from '$/src/service/class.service.js';

export async function getClassByIdController(
  request: Request,
  response: Response
): Promise<void> {
  const res = await getClassByIdService(request.params.id);

  response
    .status(res.responseCode)
    .send({ data: res.data, message: res.message });
}
