import express from 'express';
import { check } from 'express-validator';
import { getAllClassesController } from '$/src/controller/classes/getAll-class.controller.js';
import { getClassByIdController } from '$/src/controller/classes/getById-class.controller.js';
import { createClassController } from '$/src/controller/classes/create-class.controller.js';
import { updateClassController } from '$/src/controller/classes/update-class.controller.js';

export const classRoute = express.Router({ mergeParams: true });

classRoute.get('/classes', getAllClassesController);

classRoute.get('/classes/:id', getClassByIdController);

classRoute.post(
  '/classes',
  [
    check('name', 'Name must be defined').not().isEmpty(),
    check('description', 'Description must at least 30 characters long')
      .not()
      .isEmpty()
      .isLength({ min: 30 }),
  ],
  createClassController
);

classRoute.patch(
  '/classes/:id',
  [
    check('name', 'Name must be defined').optional().not().isEmpty(),
    check('description', 'Description must at least 30 characters long')
      .optional()
      .not()
      .isEmpty()
      .isLength({
        min: 30,
      }),
  ],
  updateClassController
);
