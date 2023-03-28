import { pino } from 'pino';
import { pinoHttp } from 'pino-http';

const logger = pino({
  level: process.env.PINO_LOG_LEVEL || 'info',
  serializers: {
    err: pino.stdSerializers.err, // serialize Error objects
  },
  // redact: ['PORT'],
});

const httpLogger = pinoHttp({
  logger: logger,
});

export { logger, httpLogger };
