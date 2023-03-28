import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import JwksRsa from 'jwks-rsa';
import { config } from '$/src/config/config.js';
import { JwtTokenPayload } from '$/src/middleware/jwt-token.js';

const jwksClient = JwksRsa({
  jwksUri: config.authentication.jwksUrl,
});

export async function authenticate(
  request: Request,
  response: Response,
  next: NextFunction
): Promise<unknown> {
  try {
    const encodedToken =
      request.headers.authorization?.replace('Bearer ', '') || '';
    if (!encodedToken) {
      return response.status(401).end();
    }

    const decodedToken = jwt.decode(encodedToken, { complete: true });
    if (!decodedToken) {
      return response.status(403).end();
    }

    if (config.authentication.enabled) {
      try {
        const signingKey = await jwksClient.getSigningKey(
          decodedToken.header.kid
        );
        jwt.verify(encodedToken, signingKey.getPublicKey(), {
          algorithms: ['RS256'],
        });
      } catch {
        return response.status(403).end();
      }
    }

    if (!isValidPayload(decodedToken.payload)) {
      throw new Error('Unexpected structure of JWT payload');
    }

    response.locals.token = decodedToken.payload;

    next();
  } catch (error) {
    next(error);
  }
}

function isValidPayload(
  payload: string | jwt.JwtPayload
): payload is JwtTokenPayload {
  return typeof payload !== 'string' && 'workspaceId' in payload;
}
