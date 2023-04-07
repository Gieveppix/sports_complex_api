import { check } from 'express-validator';

export const loginUserValidator = [
  check('email', 'Your email is not valid').not().isEmpty().isEmail(),
  check('password', 'Your password must be at least 4 characters')
    .not()
    .isEmpty()
    .isLength({ min: 4 }),
];
