import { check } from 'express-validator';

export const registerUserValidator = [
  check('email', 'Your email is not valid').not().isEmpty().isEmail(),
  check('password', 'Your password must be at least 4 characters')
    .not()
    .isEmpty()
    .isLength({ min: 4 }),
  check('first_name', 'First name must be defined').not().isEmpty(),
  check('last_name', 'Last name must be defined').not().isEmpty(),
  check('age_category', 'Age category must be defined').not().isEmpty(),
];
