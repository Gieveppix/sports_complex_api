import { Request, Response } from 'express';
import { getAllUsers } from '$/src/controller/users/user.dao.js';

export async function getAllUsersController(
  request: Request,
  response: Response
): Promise<void> {
  const res = await getAllUsers();

  response
    .status(res.response.responseCode)
    .send({ data: res.user, response: res.response.message });
}
