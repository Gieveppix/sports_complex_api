import express from 'express';
import { logger } from '$/src/helpers/logger.js';
import { healthController } from '$/src/controller/health.controller.js';
const app = express();

const PORT = process.env.PORT ?? 3000;

app.get('/health', healthController);

app.get('/ping', function (req, res) {
  res.send('pong');
});

app.listen(PORT, () => {
  logger.info({ PORT: `${PORT}` }, 'App is up');
});
