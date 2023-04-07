import { Request, Response } from 'express';
import { getUsersService } from '$/src/service/user.service.js';

export async function getAllUsersController(
  request: Request,
  response: Response
): Promise<void> {
  const res = await getUsersService();

  response.status(res.responseCode).send(res.message);
}
