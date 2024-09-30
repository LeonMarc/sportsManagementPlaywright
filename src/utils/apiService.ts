import { apiClient } from './apiClient';

export const apiService = {
  registerUser: async (userData: { email: string; password: string; roles: string[] }) => {
    try {
      return await apiClient.registerUser(userData);
    } catch (error: any) {
      // Aquí manejamos el error que pueda surgir al intentar registrar
      console.error('Error during user registration:', error);
      throw new Error(`User registration failed: ${error.message}`);
    }
  },
  // Agregar más servicios si es necesario
};
