import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../app/hooks';
import { logout } from '../../auth/slice';
import { obtenerNotas } from '../services/noteService';
import FormularioNota from '../components/FormularioNota';
import ListaNotas from '../components/ListaNotas';
import Modal from '../../components/Modal';
import IndicadorProgreso from '../components/IndicadorProgreso';
import BarraBusqueda from '../components/BarraBusqueda';
import Loader from '../../components/Loader';



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
  const total = notas.length;
  const completadas = notas.filter(n => n.completed).length;
  const [busqueda, setBusqueda] = useState('');
  const [cargando, setCargando] = useState(false);


  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const cargarNotas = async () => {
  try {
    setCargando(true);
    const { data } = await obtenerNotas();
    setNotas(data);
  } catch {
    setError('Error al cargar notas');
  } finally {
    setCargando(false);
  }
};

  const notasFiltradas = notas.filter(nota =>
  nota.titulo.toLowerCase().includes(busqueda.toLowerCase()) ||
  nota.nota.toLowerCase().includes(busqueda.toLowerCase())
);


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
      {cargando && (
        <div className="flex justify-center my-8">
            <Loader />
        </div>
        )}

      <BarraBusqueda valor={busqueda} onBuscar={setBusqueda} />


      <IndicadorProgreso total={total} completadas={completadas} />

      <ListaNotas
        notas={notasFiltradas}
        onActualizar={cargarNotas}
        onEditar={(nota) => {
            setNotaEditando(nota);
            setMostrarModal(true);
        }}
        />

        {notas.length === 0 && (
        <p className="text-sm text-gray-500 text-center mt-4">
            Aún no tienes notas creadas.
        </p>
        )}

        {notas.length > 0 && notasFiltradas.length === 0 && (
        <p className="text-sm text-gray-500 text-center mt-4">
            😕 No se encontraron notas que coincidan con "<strong>{busqueda}</strong>"
        </p>
        )}



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
