import { check } from 'express-validator';

export const updateClassValidator = [
  check('name', 'Name must be defined').optional().not().isEmpty(),
  check('description', 'Description must at least 30 characters long')
    .optional()
    .not()
    .isEmpty()
    .isLength({
      min: 30,
    }),
];
