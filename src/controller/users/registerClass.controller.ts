import { Request, Response } from 'express';
import { registerClass } from '$/src/controller/users/user.dao.js';

export async function registerClassController(
  request: Request,
  response: Response
): Promise<void> {
  const res = await registerClass(request.body);
  response.status(res.responseCode).send({ data: res });
}
