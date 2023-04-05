import { Request, Response } from 'express';
import { unregisterClass } from '$/src/controller/users/user.dao.js';

export async function unregisterClassController(
  request: Request,
  response: Response
): Promise<void> {
  const res = await unregisterClass(request.body);
  response.status(res.responseCode).send({ data: res });
}
