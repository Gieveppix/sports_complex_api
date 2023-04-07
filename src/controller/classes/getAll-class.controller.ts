import { Request, Response } from 'express';
import { getClasses } from '$/src/service/class.service.js';

export async function getAllClassesController(
  request: Request,
  response: Response
): Promise<void> {
  const res = await getClasses();

  response
    .status(res.responseCode)
    .send({ data: res.data, response: res.message });
}
