import api from '../../api/axios';

export interface NuevaNota {
  titulo: string;
  nota: string;
  background?: string; // Fondo opcional
}

export const obtenerNotas = () => api.get('/notas');

export const crearNota = (data: NuevaNota) => api.post('/nota', data);

export const actualizarNota = (id: string, data: Partial<NuevaNota> & { completed?: boolean }) =>
  api.put(`/notas/${id}`, data);

export const eliminarNota = (id: string) => api.delete(`/notas/${id}`);


