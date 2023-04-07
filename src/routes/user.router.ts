import express from 'express';
import { authenticate } from '$/src/middleware/authentication.js';
import { getAllUsersController } from '$/src/controller/users/getAll-user.controller.js';
import { getUserByIdController } from '$/src/controller/users/getById-user.controller.js';
import { registerUserController } from '$/src/controller/users/register-user.controller.js';
import { registerUserValidator } from '$/src/validation/users/register-user.validator.js';
import { loginUserController } from '$/src/controller/users/login-user.controller.js';
import { loginUserValidator } from '$/src/validation/users/login-user.validator.js';
import { registerClassController } from '$/src/controller/users/registerClass.controller.js';
import { registerClassUserValidator } from '$/src/validation/users/registerClass-user.validator.js';
import { registerAppointmentController } from '$/src/controller/users/registerAppointment.controller.js';
import { registerAppointmentUserValidator } from '$/src/validation/users/registerAppointment-user.validator.js';
import { updateUserValidator } from '$/src/validation/users/update-user.validator.js';
import { updateUserController } from '$/src/controller/users/update-user.controller.js';
import { unregisterClassController } from '$/src/controller/users/unregisterClass.controller.js';
import { unregisterClassUserValidator } from '$/src/validation/users/unregisterClass-user.validator.js';
import { unregisterAppointmentController } from '$/src/controller/users/unregisterAppointment.controller.js';
import { unregisterAppointmentUserValidator } from '$/src/validation/users/unregisterAppointment-user.validator.js';
import { verifyEmailUserController } from '$/src/controller/users/verifyEmail-user.controller.js';

export const userRoute = express.Router({ mergeParams: true });

userRoute.get('/users', authenticate, getAllUsersController);

userRoute.get('/users/:id', authenticate, getUserByIdController);

userRoute.get('/verify-email/:token', verifyEmailUserController);

userRoute.post('/auth/register', registerUserValidator, registerUserController);

userRoute.post('/auth/login', loginUserValidator, loginUserController);

userRoute.post(
  '/users/classes',
  authenticate,
  registerClassUserValidator,
  registerClassController
);

userRoute.post(
  '/users/appointments',
  authenticate,
  registerAppointmentUserValidator,
  registerAppointmentController
);

userRoute.patch(
  '/users/:id',
  authenticate,
  updateUserValidator,
  updateUserController
);

userRoute.delete(
  '/users/classes',
  authenticate,
  unregisterClassUserValidator,
  unregisterClassController
);

userRoute.delete(
  '/users/appointments',
  authenticate,
  unregisterAppointmentUserValidator,
  unregisterAppointmentController
);

// TODO: When user is deleting his own thing, extract the user_id from token
