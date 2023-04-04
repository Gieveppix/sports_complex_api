import express from 'express';
import { logger, httpLogger } from '$/src/helpers/logger.js';
import { healthController } from '$/src/controller/health.controller.js';
import { authenticateUser } from './middleware/auth.js';
import { userRoute } from '$/src/controller/users/user.router.js';

const app = express();
app.use(express.json());
app.use(express.urlencoded());
app.use(httpLogger);

const PORT = process.env.PORT ?? 3000;

app.use('/health', authenticateUser, healthController);
app.use('/api', userRoute);

app.listen(PORT, () => {
  logger.info({ PORT: `${PORT}` }, 'App is up');
});
