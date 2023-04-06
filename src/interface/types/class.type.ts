export type ClassId = number;

export interface Class {
  id: ClassId;
  name: string;
  description: string;
  created_at: string;
  enrollment_count: string;
  updated_at: string;
}

export const classFields: (keyof Class)[] = ['id', 'name', 'description'];
