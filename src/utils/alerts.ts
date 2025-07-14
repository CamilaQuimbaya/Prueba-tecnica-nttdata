import Swal from 'sweetalert2';

export const mostrarAlertaExito = (mensaje: string) => {
  Swal.fire({
    title: '¡Éxito!',
    text: mensaje,
    imageUrl: 'https://media.giphy.com/media/26ufdipQqU2lhNA4g/giphy.gif',
    imageWidth: 200,
    imageAlt: 'Éxito',
    confirmButtonColor: '#3085d6',
    confirmButtonText: 'OK'
  });
};

export const mostrarError = (mensaje: string) => {
  Swal.fire({
    icon: 'error',
    title: 'Oops...',
    text: mensaje,
    confirmButtonColor: '#d33'
  });
};

export const confirmarEliminacion = () => {
  return Swal.fire({
    title: '¿Estás segura?',
    text: 'Esta nota se eliminará permanentemente',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#d33',
    cancelButtonColor: '#aaa',
    confirmButtonText: 'Sí, eliminar',
    cancelButtonText: 'Cancelar'
  });
};


export const mostrarBienvenida = () => {
  Swal.fire({
    title: `¡Te extrañamos!`,
    text: 'Bienvenido a Mis Notas',
    imageUrl: 'https://media.giphy.com/media/l0MYB8Ory7Hqefo9a/giphy.gif',
    imageWidth: 250,
    imageAlt: 'Bienvenida',
    confirmButtonColor: '#6366f1',
    confirmButtonText: 'Continuar'
  });
};

export const nuevaBienvenida = () => {
  Swal.fire({
    title: `¡Que gusto que te unas!`,
    text: 'Bienvenido a Mis Notas',
    imageUrl: 'https://media.giphy.com/media/l0MYB8Ory7Hqefo9a/giphy.gif',
    imageWidth: 250,
    imageAlt: 'Bienvenida',
    confirmButtonColor: '#6366f1',
    confirmButtonText: 'Continuar'
  });
};

export const mostrarDespedida = () => {
  return Swal.fire({
    title: '¡Hasta pronto! 👋',
    text: 'Has cerrado sesión exitosamente.',
    imageUrl: 'https://media.giphy.com/media/3oKIPwoeGErMmaI43C/giphy.gif',
    imageWidth: 250,
    confirmButtonColor: '#6366f1',
    confirmButtonText: 'Volver al login'
  });
};


export const alertaSesionExpirada = () => {
  return Swal.fire({
    title: 'Sesión expirada',
    text: 'Tu sesión ha expirado. Por favor, inicia sesión de nuevo.',
    icon: 'warning',
    confirmButtonColor: '#3085d6',
    confirmButtonText: 'Aceptar',
    background: '#fff',
    color: '#333',
  });
};

