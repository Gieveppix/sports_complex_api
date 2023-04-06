import express from 'express';
import { check } from 'express-validator';
import { getAllAppointmentsController } from '../controller/appointments/getAll-appointments.controller.js';
import { getAppointmentByIdController } from '../controller/appointments/getById-appointments.controller.js';
import { createAppointmentController } from '../controller/appointments/create-appointment.controller.js';
import { updateAppointmentController } from '../controller/appointments/update-appointment.controller.js';
import { deleteAppointmentController } from '../controller/appointments/delete-appointment.controller.js';

export const appointmentRoute = express.Router({ mergeParams: true });

appointmentRoute.get('/appointments', getAllAppointmentsController);

appointmentRoute.get('/appointments/:id', getAppointmentByIdController);

appointmentRoute.post(
  '/appointments',
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

appointmentRoute.delete('/appointments/:id', deleteAppointmentController);
