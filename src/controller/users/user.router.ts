import express from 'express';
import { check } from 'express-validator';
import { registerUserController } from '$/src/controller/users/register.controller.js';

export const userRoute = express.Router({ mergeParams: true });

userRoute.post(
  '/register',
  [
    check('email', 'Your email is not valid')
      .not()
      .isEmpty()
      .isEmail()
      .normalizeEmail(),
    check('password', 'Your password must be at least 4 characters')
      .not()
      .isEmpty()
      .isLength({ min: 4 }),
  ],
  registerUserController
);
