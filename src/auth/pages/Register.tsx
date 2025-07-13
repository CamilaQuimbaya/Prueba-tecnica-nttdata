import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAppDispatch } from '../../app/hooks';
import { loginSuccess } from '../slice';
import { register } from '../services/authService';
import '../../styles/login.css';

const Register = () => {
  const [nombre, setNombre] = useState('');
  const [correo, setCorreo] = useState('');
  const [contrasena, setContrasena] = useState('');
  const [error, setError] = useState('');
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    try {
      const token = await register({ nombre, correo, contrasena });
      dispatch(loginSuccess(token));
      navigate('/');
    } catch (err) {
      setError('Error al registrar usuario');
    }
  };

  return (
    <div className="login-bg">
      <div className="w-full max-w-md login-card  p-6 rounded-lg shadow-md">
        <div className="text-center text-5xl mb-2">🧑‍💻</div>
        <h1 className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-purple-500 to-pink-500 text-center mb-2 drop-shadow-md animate-gradient">
          Crea tu cuenta
        </h1>
        <h2 className="text-xl font-semibold mb-6 text-center text-white">
          Registro
        </h2>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="text"
            placeholder="Nombre"
            value={nombre}
            onChange={e => setNombre(e.target.value)}
            className="border p-2 rounded login-card "
          />
          <input
            type="email"
            placeholder="Correo"
            value={correo}
            onChange={e => setCorreo(e.target.value)}
            className="border p-2 rounded login-card "
          />
          <input
            type="password"
            placeholder="Contraseña"
            value={contrasena}
            onChange={e => setContrasena(e.target.value)}
            className="border p-2 rounded login-card "
          />
          <button
            type="submit"
            className="neu-button"
          >
            Crear cuenta
          </button>
          {error && <p className="text-red-500 text-sm">{error}</p>}
        </form>

        <p className="text-center text-sm text-white mt-4">
          ¿Ya tienes una cuenta?{' '}
          <Link to="/login" className="text-pink-600 hover:underline">
            Inicia sesión
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
