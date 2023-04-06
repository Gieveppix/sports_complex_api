import express from 'express';
import { check } from 'express-validator';
import { authenticate } from '$/src/middleware/authentication.js';
import { getAllUsersController } from '$/src/controller/users/getAll-user.controller.js';
import { getUserByIdController } from '$/src/controller/users/getById-user.controller.js';
import { registerUserController } from '$/src/controller/users/register-user.controller.js';
import { loginUserController } from '$/src/controller/users/login-user.controller.js';
import { registerClassController } from '$/src/controller/users/registerClass.controller.js';
import { registerAppointmentController } from '$/src/controller/users/registerAppointment.controller.js';
import { updateUserController } from '$/src/controller/users/update-user.controller.js';
import { unregisterClassController } from '$/src/controller/users/unregisterClass.controller.js';
import { unregisterAppointmentController } from '$/src/controller/users/unregisterAppointment.controller.js';
import { verifyEmailUserController } from '../controller/users/verifyEmail-user.controller.js';

export const userRoute = express.Router({ mergeParams: true });

userRoute.get('/users', authenticate, getAllUsersController);

userRoute.get('/users/:id', authenticate, getUserByIdController);

userRoute.get('/verify-email/:token', verifyEmailUserController);

userRoute.post(
  '/auth/register',
  [
    check('email', 'Your email is not valid').not().isEmpty().isEmail(),
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
    check('email', 'Your email is not valid').not().isEmpty().isEmail(),
    check('password', 'Your password must be at least 4 characters')
      .not()
      .isEmpty()
      .isLength({ min: 4 }),
  ],
  loginUserController
);

userRoute.post(
  '/users/classes',
  authenticate,
  [check('user_id', 'User id is required').not().isEmpty()],
  [check('class_id', 'Class id is required').not().isEmpty()],
  registerClassController
);

userRoute.post(
  '/users/appointments',
  authenticate,
  [check('user_id', 'User id is required').not().isEmpty()],
  [check('appointment_id', 'Class id is required').not().isEmpty()],
  registerAppointmentController
);

userRoute.patch(
  '/users/:id',
  authenticate,
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

userRoute.delete(
  '/users/classes',
  authenticate,
  [check('user_id', 'User id is required').not().isEmpty()],
  [check('class_id', 'Class id is required').not().isEmpty()],
  unregisterClassController
);

userRoute.delete(
  '/users/appointments',
  authenticate,
  [check('user_id', 'User id is required').not().isEmpty()],
  [check('appointment_id', 'Class id is required').not().isEmpty()],
  unregisterAppointmentController
);

// TODO: When user is deleting his own thing, extract the user_id from token
