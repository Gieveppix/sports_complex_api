import { check } from 'express-validator';

export const updateUserValidator = [
  check('email', 'Your email is not valid')
    .optional()
    .not()
    .isEmail()
    .normalizeEmail(),
  check('password', 'Your password must be at least 4 characters')
    .optional()
    .not()
    .isLength({
      min: 4,
    }),
];
