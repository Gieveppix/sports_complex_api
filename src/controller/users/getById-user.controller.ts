import { Request, Response } from 'express';
import { getUserByIdService } from '$/src/service/user.service.js';

export async function getUserByIdController(
  request: Request,
  response: Response
): Promise<void> {
  const res = await getUserByIdService(Number(request.params.id));

  response.status(res.responseCode).send(res.message);
}
