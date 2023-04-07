import { check } from 'express-validator';

export const createClassValidator = [
  check('name', 'Name must be defined').not().isEmpty(),
  check('description', 'Description must at least 30 characters long')
    .not()
    .isEmpty()
    .isLength({ min: 30 }),
];
