import { Request, Response } from 'express';
import { getClasses } from './class.dao.js';

export async function getAllClassesController(
  request: Request,
  response: Response
): Promise<void> {
  const res = await getClasses();

  console.log(res);

  response
    .status(res.response.responseCode)
    .send({ data: res.data, response: res.response.message });
}
