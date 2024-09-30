import axios from 'axios';
import { API_ENDPOINTS } from '../config/apiEndpoints'; // Asegúrate de que esta ruta sea correcta

// CLIENTE API para gestionar interacciones con la API de registro de usuario
export const apiClient = {
  registerUser: async (userData: { email: string; password: string; roles: string[] }) => {
    const response = await axios.post(API_ENDPOINTS.registerUser, userData, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return response.data;
  },
  // Otros métodos de cliente API pueden ser añadidos aquí
};
