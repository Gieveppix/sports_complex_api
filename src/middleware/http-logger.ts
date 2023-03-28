import { pinoHttp } from 'pino-http';
import { logger } from '$/src/helpers/logger.js';

export const httpLogger = pinoHttp({
  logger: logger,
});
