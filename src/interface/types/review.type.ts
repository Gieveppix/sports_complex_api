import { UserId } from '$/src/interface/types/user.type.js';
import { ClassId } from '$/src/interface/types/class.type.js';

export type ReviewId = number;

export interface Review {
  id: ReviewId;
  user_id: UserId;
  class_id: ClassId;
  title: string;
  body: string;
  grade: number;
  created_at: string;
  updated_at: string;
}

export const classFields: (keyof Review)[] = [
  'id',
  'user_id',
  'class_id',
  'title',
  'body',
  'grade',
  'created_at',
  'updated_at',
];
