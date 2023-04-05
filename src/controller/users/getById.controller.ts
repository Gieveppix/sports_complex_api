import { Request, Response } from 'express';
import { getUserById } from '$/src/controller/users/user.dao.js';

export async function getUserByIdController(
  request: Request,
  response: Response
): Promise<void> {
  const res = await getUserById(request.params.id);

  response
    .status(res.response.responseCode)
    .send({ data: res.user, message: res.response.message });
}
