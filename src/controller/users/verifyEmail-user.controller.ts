import { Request, Response } from 'express';
import { verifyEmail } from './user.dao.js';

export async function verifyEmailUserController(
  request: Request,
  response: Response
): Promise<void> {
  const res = await verifyEmail(request.params.token);
  response.status(res.responseCode).send(res.message);
}
