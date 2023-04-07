import { check } from 'express-validator';

export const registerClassUserValidator = [
  check('user_id', 'User id is required').not().isEmpty(),
  check('class_id', 'Class id is required').not().isEmpty(),
];
