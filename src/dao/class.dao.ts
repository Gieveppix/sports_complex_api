import { db } from '$/src/database/db.js';
import { Class } from '$/src/interface/types/class.type.js';
import { Review } from '$/src/interface/types/review.type.js';

export async function createClass(
  classData: Omit<Class, 'id' | 'created_at' | 'updated_at'>
) {
  return await db.table('class').insert(classData);
}

export async function getAllClasses() {
  const classes = await db.table('class').select('*');
  const reviews = await db.table('review').select('*');

  const reviewsByClassId = reviews.reduce((acc, review) => {
    if (!acc[review.class_id]) {
      acc[review.class_id] = [];
    }
    acc[review.class_id].push(review);
    return acc;
  }, {});

  const classesWithReviews = classes.map((cls) => ({
    ...cls,
    reviews: reviewsByClassId[cls.id] || [],
  }));

  return classesWithReviews;
}

export async function getClassByIdData(id: string) {
  const cls = await db.table('class').select('*').where({ id }).first();
  if (!cls) return null;

  const reviews = await db.table('review').select('*').where({ class_id: id });

  return {
    ...cls,
    reviews,
  };
}

export async function getClassAppointments(id: string) {
  return await db
    .table('class_appointment')
    .select('*')
    .where({ class_id: id });
}

export async function updateClassData(id: string, classData: Class) {
  return await db.table('class').select('*').where({ id }).update(classData);
}

export async function createReview(
  reviewData: Omit<Review, 'id' | 'created_at' | 'updated_at'>
) {
  return await db.table('review').insert(reviewData);
}

export async function updateReviewData(id: string, reviewData: Review) {
  return await db.table('review').select('*').where({ id }).update(reviewData);
}

export async function deleteReview(id: string) {
  return await db.table('review').where({ id }).delete();
}
