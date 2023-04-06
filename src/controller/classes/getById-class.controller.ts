import { Request, Response } from 'express';
import { getClassById } from '$/src/controller/classes/class.dao.js';

export async function getClassByIdController(
  request: Request,
  response: Response
): Promise<void> {
  const res = await getClassById(request.params.id);

  response
    .status(res.response.responseCode)
    .send({ data: res.data, message: res.response.message });
}
