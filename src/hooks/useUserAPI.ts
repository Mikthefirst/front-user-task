import { useUser } from '../context/UserContext';
import { apiService } from '../services/api';
import { CreateUserData, UpdateUserData } from '../types';

export function useUserAPI() {
  const { dispatch } = useUser();

  const fetchUsers = async (page: number = 1, limit: number = 10) => {
    dispatch({ type: 'SET_LOADING', payload: true });
    try {
      const response = await apiService.fetchUsers(page, limit);
      console.log('users fetched: ', response);
      if (response.success && response.data) {
        dispatch({ type: 'SET_USERS', payload: response.data });
      } else {
        dispatch({ type: 'SET_ERROR', payload: response.message || 'Failed to fetch users' });
      }
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: 'An unexpected error occurred' });
    }
  };

  const fetchUserById = async (id: string) => {
    dispatch({ type: 'SET_LOADING', payload: true });
    try {
      const response = await apiService.fetchUserById(id);
      if (response.success && response.data) {
        dispatch({ type: 'SET_CURRENT_USER', payload: response.data });
      } else {
        dispatch({ type: 'SET_ERROR', payload: response.message || 'Failed to fetch user' });
      }
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: 'An unexpected error occurred' });
    }
  };

  const createUser = async (userData: CreateUserData) => {
    dispatch({ type: 'SET_LOADING', payload: true });
    try {
      const response = await apiService.createUser(userData);
      if (response.success && response.data) {
        dispatch({ type: 'ADD_USER', payload: response.data });
        return { success: true, message: response.message };
      } else {
        dispatch({ type: 'SET_ERROR', payload: response.message || 'Failed to create user' });
        return { success: false, message: response.message };
      }
    } catch (error) {
      const message = 'An unexpected error occurred';
      dispatch({ type: 'SET_ERROR', payload: message });
      return { success: false, message };
    }
  };

  const updateUser = async (userData: UpdateUserData) => {
    dispatch({ type: 'SET_LOADING', payload: true });
    try {
      const response = await apiService.updateUser(userData);
      if (response.success && response.data) {
        dispatch({ type: 'UPDATE_USER', payload: response.data });
        return { success: true, message: response.message };
      } else {
        dispatch({ type: 'SET_ERROR', payload: response.message || 'Failed to update user' });
        return { success: false, message: response.message };
      }
    } catch (error) {
      const message = 'An unexpected error occurred';
      dispatch({ type: 'SET_ERROR', payload: message });
      return { success: false, message };
    }
  };

  const deleteUser = async (id: string) => {
    dispatch({ type: 'SET_LOADING', payload: true });
    try {
      const response = await apiService.deleteUser(id);
      if (response.success) {
        dispatch({ type: 'REMOVE_USER', payload: id });
        return { success: true, message: response.message };
      } else {
        dispatch({ type: 'SET_ERROR', payload: response.message || 'Failed to delete user' });
        return { success: false, message: response.message };
      }
    } catch (error) {
      const message = 'An unexpected error occurred';
      dispatch({ type: 'SET_ERROR', payload: message });
      return { success: false, message };
    }
  };

  return {
    fetchUsers,
    fetchUserById,
    createUser,
    updateUser,
    deleteUser,
  };
}