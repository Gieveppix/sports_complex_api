import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { RequestUser } from '$/src/controller/users/user.type.js';
import { config } from '../config/config.js';

interface DecodedUser extends RequestUser {
  iat: number;
  exp: number;
}

declare module 'express' {
  interface Request {
    user?: RequestUser;
  }
}

export const authentication = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.header('Authorization')?.split(' ')[1];

  if (!token) {
    return res.status(401).send('Access denied. No token provided.');
  }

  try {
    const decoded = jwt.verify(token, config.jwt_secret) as DecodedUser;
    req.user = {
      id: decoded.id,
      email: decoded.email,
      is_admin: decoded.is_admin,
    };
    next();
  } catch (error) {
    res.status(400).send('Invalid token.');
  }
};
