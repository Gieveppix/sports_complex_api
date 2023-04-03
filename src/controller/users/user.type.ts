export type UserId = number;

export interface User {
  id: UserId;
  email: string;
  password: string;
  first_name: string;
  last_name: string;
  age_category: ['children', 'youth', 'young_adults', 'adults'];
  is_admin: boolean;
  created_at: string;
}

export const userFields: (keyof User)[] = [
  'id',
  'email',
  'password',
  'first_name',
  'last_name',
  'age_category',
  'is_admin',
  'created_at',
];
