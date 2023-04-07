import { check } from 'express-validator';

export const registerAppointmentUserValidator = [
  check('user_id', 'User id is required').not().isEmpty(),
  check('appointment_id', 'Appointment id is required').not().isEmpty(),
];
