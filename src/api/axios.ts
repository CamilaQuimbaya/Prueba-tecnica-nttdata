import axios from 'axios';
import { alertaSesionExpirada } from '../utils/alerts';

const api = axios.create({
  baseURL: 'https://backend-crud-y-jwt-production.up.railway.app/api',

});

// ✅ Intercepta solicitudes: agrega token
api.interceptors.request.use(config => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers['x-auth-token'] = token;
  }
  return config;
});

// ✅ Intercepta respuestas: detecta token expirado
api.interceptors.response.use(
  response => response,
  async error => {
    if (error.response?.status === 401) {
      await alertaSesionExpirada(); // espera a que el usuario confirme
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default api;
