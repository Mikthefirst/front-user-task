import { User, CreateUserData, UpdateUserData, PaginatedResponse, ApiResponse } from '../types';

const API_BASE = "http://localhost:3000/users";

class ApiService {
  async fetchUsers(
    page: number = 1,
    limit: number = 10
  ): Promise<ApiResponse<PaginatedResponse<User>>> {
    try {
      const res = await fetch(`${API_BASE}?page=${page}&limit=${limit}`);
      const data = await res.json();
      return {
        success: true,
        data,
      };
    } catch (err) {
      return {
        success: false,
        message: "Failed to fetch users",
      };
    }
  }

  async fetchUserById(id: string): Promise<ApiResponse<User>> {
    try {
      const res = await fetch(`${API_BASE}/${id}`);
      if (!res.ok) throw new Error("User not found");
      const data = await res.json();
      return {
        success: true,
        data,
      };
    } catch (err) {
      return {
        success: false,
        message: "Failed to fetch user",
      };
    }
  }

  async createUser(userData: CreateUserData): Promise<ApiResponse<User>> {
    try {
      const res = await fetch(API_BASE, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
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
        message: "Failed to create user",
      };
    }
  }

  async updateUser(userData: UpdateUserData): Promise<ApiResponse<User>> {
    try {
      const res = await fetch(`${API_BASE}/${userData.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
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
        message: "Failed to update user",
      };
    }
  }

  async deleteUser(id: string): Promise<ApiResponse<void>> {
    try {
      const res = await fetch(`${API_BASE}/${id}`, {
        method: "DELETE",
      });

      if (!res.ok) throw new Error("Failed to delete user");

      return {
        success: true,
        message: "User deleted successfully",
      };
    } catch (err) {
      return {
        success: false,
        message: "Failed to delete user",
      };
    }
  }
}

export const apiService = new ApiService();