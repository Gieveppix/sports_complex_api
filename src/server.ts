import dotenv from 'dotenv';
import express from 'express';
import { logger, httpLogger } from '$/src/helpers/logger.js';
import { healthController } from '$/src/controller/health.controller.js';
import { userRoute } from '$/src/controller/users/user.router.js';
import { classRoute } from '$/src/controller/classes/class.router.js';
import { appointmentRoute } from '$/src/controller/appointments/appointment.router.js';

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
