export type UserId = number;

export interface User {
  id: UserId;
  email: string;
  password: string;
  first_name: string;
  last_name: string;
  age_category: ['children', 'youth', 'young_adults', 'adults'];
  is_admin: boolean;
  is_email_verified: boolean;
  verification_token: string;
  created_at: string;
  updated_at: string;
  is_deleted: boolean;
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
  'updated_at',
  'is_deleted',
];

export interface RequestUser {
  id: number;
  email: string;
  is_admin: boolean;
}
