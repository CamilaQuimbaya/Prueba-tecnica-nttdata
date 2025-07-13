import { useEffect, useState } from 'react';
import { obtenerNotas } from '../services/noteService';
import FormularioNota from '../components/FormularioNota';
import ListaNotas from '../components/ListaNotas';
import Modal from '../../components/Modal';
import IndicadorProgreso from '../components/IndicadorProgreso';
import BarraBusqueda from '../components/BarraBusqueda';
import Loader from '../../components/Loader';
import LogoutButton from '../../components/LogoutButton';
import CreateNoteButton from '../components/CreateNoteButton';
import { ViewColumnsIcon, ListBulletIcon } from '@heroicons/react/24/outline'; 
import '../../styles/dashboard.css'




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
  const [vista, setVista] = useState<'lista' | 'grid'>(
  () => (localStorage.getItem('vistaNotas') as 'lista' | 'grid') || 'lista'
);




  

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




  return (
    <div className="p-4 backgroundDashboard min-h-screen ">
      
      <header className="flex flex-col md:flex-row items-center md:justify-between gap-4 mb-6  p-6 headerDashboard">
        <h2 className="text-2xl font-bold text-center md:text-left text-white">Mis Notas</h2>

        <div className="flex justify-center w-full md:w-auto">
          <BarraBusqueda valor={busqueda} onBuscar={setBusqueda} />
        </div>

        <div className="flex gap-4 justify-center md:justify-end">
          <CreateNoteButton
            onClick={() => {
              setNotaEditando(null);
              setMostrarModal(true);
            }}
          />
          <LogoutButton />
        </div>
      </header>


      {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
      {cargando && (
        <div className="flex justify-center my-8">
            <Loader />
        </div>
        )}



      <IndicadorProgreso total={total} completadas={completadas} />
      <div className="mb-4 flex gap-4">
          <button
            onClick={() => {
              const nuevaVista = vista === 'grid' ? 'lista' : 'grid';
              setVista(nuevaVista);
              localStorage.setItem('vistaNotas', nuevaVista);
            }}
            className="p-2 rounded-full border border-white hover:bg-blue-100 transition"
            title={vista === 'grid' ? 'Ver como lista' : 'Ver como cuadrícula'}
          >
            {vista === 'grid' ? (
              <ListBulletIcon className="h-5 w-5 text-white hover:text-purple-700" />
            ) : (
              <ViewColumnsIcon className="h-5 w-5 text-white  hover:text-purple-700" />
            )}
          </button>
        </div>



      <ListaNotas
  notas={notasFiltradas}
  onActualizar={cargarNotas}
  onEditar={(nota) => {
    setNotaEditando(nota);
    setMostrarModal(true);
  }}
  vista={vista}
/>



        {notas.length === 0 && (
        <p className="text-sm text-white text-center mt-4">
            Aún no tienes notas creadas.
        </p>
        )}

        {notas.length > 0 && notasFiltradas.length === 0 && (
        <p className="text-sm text-white text-center mt-4">
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
