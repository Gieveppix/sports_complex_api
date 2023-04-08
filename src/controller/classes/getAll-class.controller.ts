import { Request, Response } from 'express';
import { getClassesService } from '$/src/service/class.service.js';

export async function getAllClassesController(
  request: Request,
  response: Response
): Promise<void> {
  const res = await getClassesService();

  response
    .status(res.responseCode)
    .send({ data: res.data, response: res.message });
}
