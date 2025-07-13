import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAppDispatch } from '../../app/hooks';
import { loginSuccess } from '../slice';
import { register } from '../services/authService';

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
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-md bg-white p-6 rounded-lg shadow-md">
        <div className="text-center text-5xl mb-2">🧑‍💻</div>
        <h1 className="text-3xl font-bold text-center mb-2 text-blue-700">
          Crea tu cuenta
        </h1>
        <h2 className="text-xl font-semibold mb-6 text-center text-gray-800">
          Registro
        </h2>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="text"
            placeholder="Nombre"
            value={nombre}
            onChange={e => setNombre(e.target.value)}
            className="border p-2 rounded"
          />
          <input
            type="email"
            placeholder="Correo"
            value={correo}
            onChange={e => setCorreo(e.target.value)}
            className="border p-2 rounded"
          />
          <input
            type="password"
            placeholder="Contraseña"
            value={contrasena}
            onChange={e => setContrasena(e.target.value)}
            className="border p-2 rounded"
          />
          <button
            type="submit"
            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
          >
            Crear cuenta
          </button>
          {error && <p className="text-red-500 text-sm">{error}</p>}
        </form>

        <p className="text-center text-sm text-gray-600 mt-4">
          ¿Ya tienes una cuenta?{' '}
          <Link to="/login" className="text-blue-600 hover:underline">
            Inicia sesión
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
