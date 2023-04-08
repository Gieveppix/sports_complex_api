import express from 'express';
import { config } from '$/src/config/config.js';
import { logger, httpLogger } from '$/src/helpers/logger.js';
import { healthController } from '$/src/controller/health.controller.js';
import { userRoute } from '$/src/routes/user.router.js';
import { classRoute } from '$/src/routes/class.router.js';
import { appointmentRoute } from '$/src/routes/appointment.router.js';

const app = express();
app.use(express.json());
app.use(express.urlencoded());
app.use(httpLogger);

const PORT = config.port ?? 3001;

app.use('/health', healthController);
app.use('/api', userRoute);
app.use('/api', classRoute);
app.use('/api', appointmentRoute);

console.log(config);

app.listen(PORT, () => {
  logger.info(`App is up on port ${PORT}`);
});
