import express from 'express';
import { authenticate } from '$/src/middleware/authentication.js';
import { getAllClassesController } from '$/src/controller/classes/getAll-class.controller.js';
import { getClassByIdController } from '$/src/controller/classes/getById-class.controller.js';
import { createClassController } from '$/src/controller/classes/create-class.controller.js';
import { createClassValidator } from '$/src/validation/classes/create-class.validator.js';
import { updateClassController } from '$/src/controller/classes/update-class.controller.js';
import { updateClassValidator } from '$/src/validation/classes/update-class.validator.js';
import { createReviewController } from '$/src/controller/classes/create-review.controller.js';
import { createReviewValidator } from '$/src/validation/classes/create-review.validator.js';
import { updateReviewController } from '$/src/controller/classes/update-review.controller.js';
import { updateReviewValidator } from '$/src/validation/classes/update-review.validator.js';
import { deleteReviewController } from '$/src/controller/classes/delete-review.controller.js';

export const classRoute = express.Router({ mergeParams: true });

classRoute.get('/classes', authenticate, getAllClassesController);

classRoute.get('/classes/:id', authenticate, getClassByIdController);

classRoute.post(
  '/classes',
  authenticate,
  createClassValidator,
  createClassController
);

classRoute.patch(
  '/classes/:id',
  authenticate,
  updateClassValidator,
  updateClassController
);

classRoute.post(
  '/classes/reviews',
  authenticate,
  createReviewValidator,
  createReviewController
);

classRoute.patch(
  '/classes/reviews/:id',
  authenticate,
  updateReviewValidator,
  updateReviewController
);

classRoute.delete('/classes/reviews/:id', authenticate, deleteReviewController);
