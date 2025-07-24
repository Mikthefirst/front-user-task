import { User, CreateUserData, UpdateUserData, PaginatedResponse, ApiResponse } from '../types';

const API_BASE = "http://localhost:3000/users";


const STORAGE_KEY = 'user_management_data';
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// Mock data for initial setup
const mockUsers: User[] = [
  {
    id: '1',
    firstName: 'John',
    lastName: 'Doe',
    height: 180,
    weight: 75,
    gender: 'male',
    residence: 'New York, USA',
    photo: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=400',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: '2',
    firstName: 'Jane',
    lastName: 'Smith',
    height: 165,
    weight: 60,
    gender: 'female',
    residence: 'London, UK',
    photo: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=400',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: '3',
    firstName: 'Mike',
    lastName: 'Johnson',
    height: 175,
    weight: 80,
    gender: 'male',
    residence: 'Toronto, Canada',
    photo: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=400',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: '4',
    firstName: 'Sarah',
    lastName: 'Wilson',
    height: 170,
    weight: 65,
    gender: 'female',
    residence: 'Sydney, Australia',
    photo: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=400',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: '5',
    firstName: 'David',
    lastName: 'Brown',
    height: 182,
    weight: 85,
    gender: 'male',
    residence: 'Berlin, Germany',
    photo: 'https://images.pexels.com/photos/697509/pexels-photo-697509.jpeg?auto=compress&cs=tinysrgb&w=400',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];

class ApiService {

  
  async fetchUsers(): Promise<ApiResponse<User[]>> {
    try {
      const res = await fetch(API_BASE);
      const data = await res.json();
      return {
        success: true,
        data,
      };
    } catch (err) {
      return {
        success: false,
        message: 'Failed to fetch users',
      };
    }
  }

  async fetchUserById(id: string): Promise<ApiResponse<User>> {
    try {
      const res = await fetch(`${API_BASE}/${id}`);
      if (!res.ok) throw new Error('User not found');
      const data = await res.json();
      return {
        success: true,
        data,
      };
    } catch (err) {
      return {
        success: false,
        message: 'Failed to fetch user',
      };
    }
  }

  async createUser(userData: CreateUserData): Promise<ApiResponse<User>> {
    try {
      const res = await fetch(API_BASE, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userData),
      });
      const data = await res.json();
      return {
        success: true,
        data,
      };
    } catch (err) {
      return {
        success: false,
        message: 'Failed to create user',
      };
    }
  }

  async updateUser(userData: UpdateUserData): Promise<ApiResponse<User>> {
    try {
      const res = await fetch(`${API_BASE}/${userData.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userData),
      });
      const data = await res.json();
      return {
        success: true,
        data,
      };
    } catch (err) {
      return {
        success: false,
        message: 'Failed to update user',
      };
    }
  }

  async deleteUser(id: string): Promise<ApiResponse<void>> {
    try {
      const res = await fetch(`${API_BASE}/${id}`, {
        method: 'DELETE',
      });

      if (!res.ok) throw new Error('Failed to delete user');

      return {
        success: true,
        message: 'User deleted successfully',
      };
    } catch (err) {
      return {
        success: false,
        message: 'Failed to delete user',
      };
    }
  }
}

export const apiService = new ApiService();