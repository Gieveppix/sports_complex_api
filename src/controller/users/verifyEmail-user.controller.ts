import { Request, Response } from 'express';
import { verifyEmailService } from '$/src/service/user.service.js';

export async function verifyEmailUserController(
  request: Request,
  response: Response
): Promise<void> {
  const res = await verifyEmailService(request.params.token);
  response.status(res.responseCode).send(res.message);
}
