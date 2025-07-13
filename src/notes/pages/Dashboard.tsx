import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../app/hooks';
import { logout } from '../../auth/slice';
import { obtenerNotas } from '../services/noteService';
import FormularioNota from '../components/FormularioNota';
import ListaNotas from '../components/ListaNotas';
import Modal from '../../components/Modal';

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
  const [mostrarModal, setMostrarModal] = useState(false);
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
    <div className="p-4">
      <header className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Mis Notas</h2>
        <div className="flex gap-4">
          <button
            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
            onClick={() => {
              setNotaEditando(null);
              setMostrarModal(true);
            }}
          >
            Nueva Nota
          </button>
          <button
            className="bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700"
            onClick={handleLogout}
          >
            Cerrar sesión
          </button>
        </div>
      </header>

      {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

      <ListaNotas
        notas={notas}
        onActualizar={cargarNotas}
        onEditar={(nota) => {
          setNotaEditando(nota);
          setMostrarModal(true);
        }}
      />

      <Modal open={mostrarModal} onClose={() => setMostrarModal(false)}>
        <FormularioNota
          onNotaGuardada={() => {
            cargarNotas();
            setMostrarModal(false);
            setNotaEditando(null);
          }}
          notaExistente={notaEditando ?? undefined}
        />
      </Modal>
    </div>
  );
};

export default Dashboard;
