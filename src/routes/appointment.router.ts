import express from 'express';
import { authenticate } from '$/src/middleware/authentication.js';
import { getAllAppointmentsController } from '$/src/controller/appointments/getAll-appointment.controller.js';
import { getAppointmentByIdController } from '$/src/controller/appointments/getById-appointment.controller.js';
import { createAppointmentController } from '$/src/controller/appointments/create-appointment.controller.js';
import { createAppointmentValidator } from '$/src/validation/appointments/create-appointment.validator.js';
import { updateAppointmentController } from '$/src/controller/appointments/update-appointment.controller.js';
import { updateAppointmentValidator } from '$/src/validation/appointments/update-appointment.validator.js';
import { deleteAppointmentController } from '$/src/controller/appointments/delete-appointment.controller.js';

export const appointmentRoute = express.Router({ mergeParams: true });

appointmentRoute.get(
  '/appointments',
  authenticate,
  getAllAppointmentsController
);

appointmentRoute.get(
  '/appointments/:id',
  authenticate,
  getAppointmentByIdController
);

appointmentRoute.post(
  '/appointments',
  authenticate,
  createAppointmentValidator,
  createAppointmentController
);

appointmentRoute.patch(
  '/appointments/:id',
  authenticate,
  updateAppointmentValidator,
  updateAppointmentController
);

appointmentRoute.delete(
  '/appointments/:id',
  authenticate,
  deleteAppointmentController
);
