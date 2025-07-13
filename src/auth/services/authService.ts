import api from '../../api/axios';

interface LoginData {
  correo: string;
  contrasena: string;
}

interface RegisterData {
  nombre: string;
  correo: string;
  contrasena: string;
}

export const login = async (data: LoginData): Promise<string> => {
  const response = await api.post('/auth/login', data);
  return response.data.token;
};

export const register = async (data: RegisterData): Promise<string> => {
  const response = await api.post('/auth/registrar', data);
  return response.data.token;
};
