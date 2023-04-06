import express from 'express';
import { check } from 'express-validator';
import { authenticate } from '$/src/middleware/authentication.js';
import { getAllAppointmentsController } from '$/src/controller/appointments/getAll-appointment.controller.js';
import { getAppointmentByIdController } from '$/src/controller/appointments/getById-appointment.controller.js';
import { createAppointmentController } from '$/src/controller/appointments/create-appointment.controller.js';
import { updateAppointmentController } from '$/src/controller/appointments/update-appointment.controller.js';
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
  [
    check('class_id', 'Id of parent must be defined')
      .isNumeric()
      .not()
      .isEmpty(),
    check('starting_at', 'Start time has to be defined').not().isEmpty(),
    check('age_category', 'Age caegory has to be defined').not().isEmpty(),
    check('starting_at', 'Start time has to be defined').not().isEmpty(),
  ],
  createAppointmentController
);

appointmentRoute.patch(
  '/appointments/:id',
  authenticate,
  [
    check('class_id', 'Id of parent must be defined')
      .isNumeric()
      .not()
      .isEmpty(),
    check('starting_at', 'Start time has to be defined').not().isEmpty(),
    check('age_category', 'Age caegory has to be defined').not().isEmpty(),
    check('starting_at', 'Start time has to be defined').not().isEmpty(),
  ],
  updateAppointmentController
);

appointmentRoute.delete(
  '/appointments/:id',
  authenticate,
  deleteAppointmentController
);
