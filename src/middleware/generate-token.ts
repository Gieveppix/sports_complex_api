import jwt from 'jsonwebtoken';
import { User } from '$/src/interface/types/user.type.js';
import { config } from '$/src/config/config.js';

export function generateToken(user: User): string {
  const payload = {
    id: user.id,
    email: user.email,
    is_admin: user.is_admin, // Add the is_admin field to the JWT payload
  };

  const options = {
    expiresIn: '7d', // 2 minutes
  };

  return jwt.sign(payload, config.jwt_secret, options);
}
