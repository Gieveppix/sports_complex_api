import { Request, Response } from 'express';
import { unenrollUserFromClassService } from '$/src/service/user.service.js';

export async function unregisterClassController(
  request: Request,
  response: Response
): Promise<void> {
  const { user_id, class_id } = request.body;

  const res = await unenrollUserFromClassService(user_id, class_id);
  response.status(res.responseCode).send({ data: res });
}
