import { check } from 'express-validator';

export const updateAppointmentValidator = [
  check('class_id', 'Id of parent must be defined').isNumeric().not().isEmpty(),
  check('starting_at', 'Start time has to be defined').not().isEmpty(),
  check('age_category', 'Age caegory has to be defined').not().isEmpty(),
  check('starting_at', 'Start time has to be defined').not().isEmpty(),
];
