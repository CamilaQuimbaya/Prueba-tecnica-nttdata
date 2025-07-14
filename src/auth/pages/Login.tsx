import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAppDispatch } from '../../app/hooks';
import { loginSuccess } from '../slice';
import { login } from '../services/authService';
import { mostrarBienvenida } from '../../utils/alerts';
import NoteLoad from '../../components/NoteLoad';
import '../../styles/login.css';

// Componente de Login
// Este componente maneja el inicio de sesión del usuario

const Login = () => {
  const [correo, setCorreo] = useState('');
  const [contrasena, setContrasena] = useState('');
  const [error, setError] = useState('');
  const dispatch = useAppDispatch(); // Hook para acceder al dispatch de Redux
  // Hook para navegar a otras rutas
  const navigate = useNavigate();

  // Maneja el envío del formulario
  // Intenta iniciar sesión y redirige al usuario si tiene éxito
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    try {
      const token = await login({ correo, contrasena });// Llama al servicio de autenticación para iniciar sesión
      dispatch(loginSuccess(token)); // Guarda el token en el estado de Redux
      // Muestra una alerta de bienvenida
       mostrarBienvenida();
      navigate('/');
    } catch (err) {
      setError('Credenciales inválidas');
    }
  };

  // Renderiza el formulario de inicio de sesión
  // Incluye campos para correo y contraseña, y un botón para enviar el formulario
  // También muestra un enlace para registrarse si el usuario no tiene cuenta

  return (
    <div className="login-bg">
      <div className="w-full max-w-md login-card p-6 rounded-4xl shadow-md">
        <div className='flex justify-center'><NoteLoad /></div>
        <h1 className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-purple-500 to-pink-500 text-center mb-2">
          Bienvenido a Mis Notas
        </h1>
        <h2 className="text-xl font-semibold mb-6 text-center text-white">
          Iniciar sesión
        </h2>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="email"
            placeholder="Correo"
            value={correo}
            onChange={e => setCorreo(e.target.value)}
            className="border p-2 rounded login-card"
          />
          <input
            type="password"
            placeholder="Contraseña"
            value={contrasena}
            onChange={e => setContrasena(e.target.value)}
            className="border p-2 rounded login-card"
          />
          <button
            type="submit"
            className="neu-button"
          >
            Entrar
          </button>
          {error && <p className="text-red-500 text-sm">{error}</p>}
        </form>

        <p className="text-center text-sm text-white mt-4">
          ¿Aún no tienes cuenta?{' '}
          <Link to="/register" className="text-pink-400 hover:underline">
            Regístrate aquí
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
