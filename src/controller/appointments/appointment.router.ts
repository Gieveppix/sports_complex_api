import express from 'express';
import { check } from 'express-validator';
import { createAppointmentController } from '$/src/controller/appointments/createAppointment.controller.js';
import { updateAppointmentController } from '$/src/controller/appointments/updateAppointment.controller.js';
import { getAllAppointmentsController } from './getAllAppointments.controller.js';
import { getAppointmentByIdController } from './getAppointmentsById.controller.js';
import { deleteAppointmentController } from './deleteAppointment.controller.js';

export const appointmentRoute = express.Router({ mergeParams: true });

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

appointmentRoute.get('/appointments', getAllAppointmentsController);

appointmentRoute.get('/appointments/:id', getAppointmentByIdController);

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
