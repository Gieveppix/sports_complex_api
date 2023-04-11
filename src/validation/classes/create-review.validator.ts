import { check } from 'express-validator';

export const createReviewValidator = [
  check('user_id', 'User ID must be defined').not().isEmpty(),
  check('class_id', 'Class ID must be defined').not().isEmpty(),
  check('title', 'Title must be defined').not().isEmpty(),
  check('body', 'Description must at least 30 characters long')
    .not()
    .isEmpty()
    .isLength({ min: 30 }),
  check('grade', 'Grade must be defined').not().isEmpty(),
];
