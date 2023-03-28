import express from 'express';
import { logger, httpLogger } from '$/src/helpers/logger.js';
import { healthController } from '$/src/controller/health.controller.js';

const app = express();
app.use(httpLogger);

const PORT = process.env.PORT ?? 3000;

app.use('/health', healthController);

app.listen(PORT, () => {
  logger.info({ PORT: `${PORT}` }, 'App is up');
});
