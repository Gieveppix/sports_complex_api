import { Response } from 'express';
import { JwtPayload } from 'jsonwebtoken';
import { WithWorkspaceId } from '$/src/interface/types/workspace-id.type.js';

export type JwtTokenPayload = JwtPayload & WithWorkspaceId;

export function getToken(response: Response): JwtTokenPayload {
  return response.locals.token;
}
