import { actualizarNota, eliminarNota } from '../services/noteService';
import { PencilSquareIcon, TrashIcon } from '@heroicons/react/24/outline';
import { confirmarEliminacion, mostrarAlertaExito, mostrarError } from '../../utils/alerts';
import { CalendarDaysIcon, ClockIcon } from '@heroicons/react/24/outline';
import CheckTarea from '../../components/CheckTarea';
import '../../styles/notaCard.css'

interface Nota {
  _id: string;
  titulo: string;
  nota: string;
  completed: boolean;
  fecha: string;
  background?: string;
}

interface Props {
  nota: Nota;
  onNotaActualizada: () => void;
  onEditar: (nota: Nota) => void;
  onVerDetalle: (nota: Nota) => void; 
}

const NotaCard = ({ nota, onNotaActualizada, onEditar, onVerDetalle }: Props) => {
  const toggleEstado = async () => {
    try {
      await actualizarNota(nota._id, { completed: !nota.completed });
      onNotaActualizada();
    } catch {
      mostrarError('Ocurrió un error al actualizar la nota');
    }
  };

  const handleEliminar = async () => {
    const result = await confirmarEliminacion();
    if (result.isConfirmed) {
      await eliminarNota(nota._id);
      onNotaActualizada();
      mostrarAlertaExito('Nota eliminada');
    }
  };

  return (
  <div
    className={`p-4 rounded-3xl mb-4 shadow ${nota.background}`}
    onClick={() => onVerDetalle(nota)} // 👈 abrir modal al hacer click en la tarjeta
  >
    <div className="flex justify-between items-center mb-2">
      <h4 className="font-bold text-2xl text-purple-800 truncate max-w-[70%]">
        {nota.titulo}
      </h4>

      <div
        className="flex items-center gap-2"
        onClick={(e) => e.stopPropagation()} // 👈 evita abrir el modal desde el checkbox
      >
        <CheckTarea
          checked={nota.completed}
          id={`check-${nota._id}`}
          onChange={toggleEstado}
        />
      </div>
    </div>

    <p className="mb-2 text-purple-400 line-clamp-2">{nota.nota}</p>

    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-1 sm:gap-4 text-sm text-purple-800 mb-2">
      <span className="flex items-center gap-1">
        <CalendarDaysIcon className="h-4 w-4" />
        {new Date(nota.fecha).toLocaleDateString()}
      </span>
      <span className="flex items-center gap-1">
        <ClockIcon className="h-4 w-4" />
        {new Date(nota.fecha).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
      </span>
    </div>

    <div
      className="flex gap-3 mt-2"
      onClick={(e) => e.stopPropagation()} // 👈 evita abrir modal al hacer click en editar/eliminar
    >
      <button
        onClick={() => onEditar(nota)}
        title="Editar"
        className="glassButton text-pink-400 hover:text-yellow-600 p-2"
      >
        <PencilSquareIcon className="h-5 w-5" />
      </button>
      <button
        onClick={handleEliminar}
        title="Eliminar"
        className="glassButton text-red-800 hover:text-red-600 p-2"
      >
        <TrashIcon className="h-5 w-5" />
      </button>
    </div>
  </div>
);

};

export default NotaCard;