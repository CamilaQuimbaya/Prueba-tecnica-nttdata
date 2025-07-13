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
    <div>
      <h2>Registrarse</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Nombre"
          value={nombre}
          onChange={e => setNombre(e.target.value)}
        />
        <input
          type="email"
          placeholder="Correo"
          value={correo}
          onChange={e => setCorreo(e.target.value)}
        />
        <input
          type="password"
          placeholder="Contraseña"
          value={contrasena}
          onChange={e => setContrasena(e.target.value)}
        />
        <button type="submit">Crear cuenta</button>
        {error && <p style={{ color: 'red' }}>{error}</p>}
      </form>

      <p style={{ marginTop: '1rem' }}>
        ¿Ya tienes una cuenta?{' '}
        <Link to="/login" style={{ color: 'blue' }}>
          Inicia sesión
        </Link>
      </p>
    </div>
  );
};

export default Register;
