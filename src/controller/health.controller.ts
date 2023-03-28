import { NextFunction, Request, Response } from 'express';
import { db } from '$/src/database/db.js';

export async function healthController(
  _request: Request,
  response: Response,
  next: NextFunction
): Promise<void> {
  try {
    await db.from('class').select('id').limit(1);
    response.sendStatus(204);
  } catch (error) {
    next(error);
  }
}
