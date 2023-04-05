import { ClassId } from '../classes/class.type.js';

export type AppointmentId = number;

export interface Appointment {
  id: AppointmentId;
  class_id: ClassId;
  starting_at: string;
  age_category: ['children', 'youth', 'young_adults', 'adults'];
  duration?: ['30', '45', '60', '75', '90', '105', '120', '150', '180'];
  created_at: string;
  updated_at: string;
  is_deleted: boolean;
}

export const classFields: (keyof Appointment)[] = [
  'id',
  'class_id',
  'starting_at',
  'age_category',
  'duration',
  'created_at',
  'updated_at',
  'is_deleted',
];
