import { actualizarNota, eliminarNota } from '../services/noteService';
import { PencilSquareIcon, TrashIcon } from '@heroicons/react/24/outline';
import { confirmarEliminacion, mostrarAlertaExito } from '../../utils/alerts';


interface Nota {
  _id: string;
  titulo: string;
  nota: string;
  completed: boolean;
  fecha: string;
}

interface Props {
  nota: Nota;
  onNotaActualizada: () => void;
  onEditar: (nota: Nota) => void;
}

const NotaCard = ({ nota, onNotaActualizada, onEditar }: Props) => {
  const toggleEstado = async () => {
    try {
      await actualizarNota(nota._id, { completed: !nota.completed });
      onNotaActualizada();
    } catch {
      alert('Error al actualizar nota');
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
    <div className="border p-4 rounded mb-4 shadow">
      <div className="flex justify-between items-center mb-2">
        <h4 className="font-bold text-lg">{nota.titulo}</h4>
        <label className="flex items-center gap-2 text-sm">
          <input
            type="checkbox"
            checked={nota.completed}
            onChange={toggleEstado}
            className="accent-green-600 w-4 h-4"
          />
          {nota.completed ? 'Completada' : 'Pendiente'}
        </label>
      </div>

      <p className="mb-2">{nota.nota}</p>

      <small className="text-gray-400 block mb-2">
        {new Date(nota.fecha).toLocaleString()}
      </small>

      <div className="flex gap-3">
        <button
            onClick={() => onEditar(nota)}
            title="Editar"
            className="text-yellow-600 hover:text-yellow-800"
        >
            <PencilSquareIcon className="h-5 w-5" />
        </button>
        <button
            onClick={handleEliminar}
            title="Eliminar"
            className="text-red-600 hover:text-red-800"
        >
            <TrashIcon className="h-5 w-5" />
        </button>
        </div>


    </div>
  );
};

export default NotaCard;
