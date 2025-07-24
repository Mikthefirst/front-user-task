import { CreateUserData, FormErrors } from '../types';

export function validateUserForm(data: CreateUserData): FormErrors {
  const errors: FormErrors = {};

  if (!data.firstName.trim()) {
    errors.firstName = 'First name is required';
  } else if (data.firstName.trim().length < 2) {
    errors.firstName = 'First name must be at least 2 characters';
  }

  if (!data.lastName.trim()) {
    errors.lastName = 'Last name is required';
  } else if (data.lastName.trim().length < 2) {
    errors.lastName = 'Last name must be at least 2 characters';
  }

  if (!data.height || data.height <= 0) {
    errors.height = 'Height must be a positive number';
  } else if (data.height < 50 || data.height > 300) {
    errors.height = 'Height must be between 50 and 300 cm';
  }

  if (!data.weight || data.weight <= 0) {
    errors.weight = 'Weight must be a positive number';
  } else if (data.weight < 10 || data.weight > 500) {
    errors.weight = 'Weight must be between 10 and 500 kg';
  }

  if (!data.gender) {
    errors.gender = 'Gender is required';
  }

  if (!data.residence.trim()) {
    errors.residence = 'Residence is required';
  } else if (data.residence.trim().length < 3) {
    errors.residence = 'Residence must be at least 3 characters';
  }

  if (!data.photo.trim()) {
    errors.photo = 'Photo URL is required';
  } else {
    try {
      new URL(data.photo);
    } catch {
      errors.photo = 'Please enter a valid URL';
    }
  }

  return errors;
}