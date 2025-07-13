import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../app/hooks';
import { logout } from '../../auth/slice';
import { obtenerNotas } from '../services/noteService';
import FormularioNota from '../components/FormularioNota';
import ListaNotas from '../components/ListaNotas';

interface Nota {
  _id: string;
  titulo: string;
  nota: string;
  completed: boolean;
  fecha: string;
}

const Dashboard = () => {
  const [notas, setNotas] = useState<Nota[]>([]);
  const [error, setError] = useState('');
  const [notaEditando, setNotaEditando] = useState<Nota | null>(null);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const cargarNotas = async () => {
    try {
      const { data } = await obtenerNotas();
      setNotas(data);
    } catch {
      setError('Error al cargar notas');
    }
  };

  useEffect(() => {
    cargarNotas();
  }, []);

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  return (
    <div>
      <header style={{ display: 'flex', justifyContent: 'space-between' }}>
        <h2>Mis Notas</h2>
        <button onClick={handleLogout}>Cerrar sesión</button>
      </header>

      <FormularioNota
        onNotaGuardada={() => {
          cargarNotas();
          setNotaEditando(null);
        }}
        notaExistente={notaEditando ?? undefined}
      />

      {error && <p style={{ color: 'red' }}>{error}</p>}

      <ListaNotas notas={notas} onActualizar={cargarNotas} onEditar={setNotaEditando} />
    </div>
  );
};

export default Dashboard;