import dotenv from 'dotenv';
import express from 'express';
import { logger, httpLogger } from '$/src/helpers/logger.js';
import { healthController } from '$/src/controller/health.controller.js';
import { userRoute } from '$/src/routes/user.router.js';
import { classRoute } from '$/src/routes/class.router.js';
import { appointmentRoute } from '$/src/routes/appointment.router.js';

dotenv.config();

const app = express();
app.use(express.json());
app.use(express.urlencoded());
app.use(httpLogger);

const PORT = process.env.PORT ?? 3001;

app.use('/health', healthController);
app.use('/api', userRoute);
app.use('/api', classRoute);
app.use('/api', appointmentRoute);

app.listen(PORT, () => {
  logger.info({ PORT: `${PORT}` }, 'App is up');
});
