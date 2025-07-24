export interface User {
  id: string;
  firstName: string;
  lastName: string;
  height: number; // in cm
  weight: number; // in kg
  gender: 'male' | 'female' | 'other';
  residence: string;
  photo: string; // URL
  createdAt: string;
  updatedAt: string;
}

export interface CreateUserData {
  firstName: string;
  lastName: string;
  height: number;
  weight: number;
  gender: 'male' | 'female' | 'other';
  residence: string;
  photo: string;
}

export interface UpdateUserData extends CreateUserData {
  id: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  message?: string;
}

export interface FormErrors {
  [key: string]: string;
}