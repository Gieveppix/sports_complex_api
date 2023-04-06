import { Request, Response, NextFunction } from 'express';
import { User } from '$/src/interface/types/user.type.js';

export function isAdmin(req: Request, res: Response, next: NextFunction) {
  const user = req.user as User;

  if (user.is_admin) {
    next();
  } else {
    res.status(403).json({ message: 'Forbidden: Access is denied' });
  }
}
