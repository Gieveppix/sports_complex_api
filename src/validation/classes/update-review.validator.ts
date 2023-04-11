import { check } from 'express-validator';

export const updateReviewValidator = [
  check('user_id', 'User ID must be defined').optional().not().isEmpty(),
  check('class_id', 'Class ID must be defined').optional().not().isEmpty(),
  check('title', 'Title must be defined').optional().not().isEmpty(),
  check('body', 'Description must at least 30 characters long')
    .optional()
    .not()
    .isEmpty()
    .isLength({ min: 30 }),
  check('grade', 'Grade must be defined').optional().not().isEmpty(),
];
