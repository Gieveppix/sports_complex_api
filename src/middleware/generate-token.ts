import jwt from 'jsonwebtoken';
import { User } from '$/src/controller/users/user.type.js';
import { config } from '../config/config.js';

export function generateToken(user: User): string {
  const payload = {
    id: user.id,
    email: user.email,
    is_admin: user.is_admin, // Add the is_admin field to the JWT payload
  };

  const options = {
    expiresIn: '30000', // 30 seconds
  };

  return jwt.sign(payload, config.jwt_secret, options);
}
