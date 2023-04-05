import express from 'express';
import { check } from 'express-validator';
import { registerUserController } from '$/src/controller/users/register.controller.js';
import { loginUserController } from '$/src/controller/users/login.controller.js';
import { getAllUsersController } from '$/src/controller/users/getAll.controller.js';
import { getUserByIdController } from '$/src/controller/users/getById.controller.js';
import { updateUserController } from '$/src/controller/users/updateUser.controller.js';
import { registerClassController } from './registerClass.controller.js';

export const userRoute = express.Router({ mergeParams: true });

userRoute.post(
  '/auth/register',
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
    check('first_name', 'First name must be defined').not().isEmpty(),
    check('last_name', 'Last name must be defined').not().isEmpty(),
    check('age_category', 'Age category must be defined').not().isEmpty(),
  ],
  registerUserController
);

userRoute.post(
  '/auth/login',
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
  loginUserController
);

userRoute.post('/users/class', registerClassController);

userRoute.get('/users', getAllUsersController);

userRoute.get('/users/:id', getUserByIdController);

userRoute.patch(
  '/users/:id',
  [
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
  ],
  updateUserController
);
