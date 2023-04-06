import { Request, Response } from 'express';
import { ValidationError, validationResult } from 'express-validator';
import { updateUser } from '$/src/controller/users/user.dao.js';

export async function updateUserController(
  request: Request,
  response: Response
): Promise<void> {
  const errors = validationResult(request);
  const res = await updateUser(request.params.id, request.body);

  if (!errors.isEmpty()) {
    response.status(422).send(errors.errors[0].msg as ValidationError);
  } else if (res.response === undefined) {
    response.status(res.responseCode).json(res.message);
  } else {
    response
      .status(res.response.responseCode)
      .json({ data: res.user, message: res.response.message });
  }
}
