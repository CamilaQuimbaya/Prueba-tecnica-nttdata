import axios from 'axios';
import { alertaSesionExpirada } from '../utils/alerts';
import { toast } from 'react-toastify';

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

// ✅ Intercepta respuestas: sesión expirada o errores generales
api.interceptors.response.use(
  response => response,
  async error => {
    const status = error.response?.status;
    const mensaje = error.response?.data?.msg || 'Error del servidor';

    if (status === 401 && mensaje === 'Token no valido') {
      await alertaSesionExpirada();
      localStorage.removeItem('token');
      window.location.href = '/login';
    } else {
      toast.error(`⚠️ ${mensaje}`);
    }

    return Promise.reject(error);
  }
);

export default api;
