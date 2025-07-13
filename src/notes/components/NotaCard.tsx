import { actualizarNota, eliminarNota } from '../services/noteService';

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
    if (confirm('¿Estás segura de eliminar esta nota?')) {
      try {
        await eliminarNota(nota._id);
        onNotaActualizada();
      } catch {
        alert('Error al eliminar nota');
      }
    }
  };

  return (
    <div className="border p-4 rounded mb-4 shadow">
      <h4 className="font-bold text-lg">{nota.titulo}</h4>
      <p>{nota.nota}</p>
      <p className="text-sm text-gray-500">
        Estado: {nota.completed ? '✅ Completada' : '❌ Pendiente'}
      </p>
      <small className="text-gray-400">
        {new Date(nota.fecha).toLocaleString()}
      </small>
      <div className="mt-2 flex gap-2">
        <button onClick={toggleEstado} className="text-blue-600 hover:underline">
          Marcar como {nota.completed ? 'pendiente' : 'completada'}
        </button>
        <button onClick={() => onEditar(nota)} className="text-yellow-600 hover:underline">
          Editar
        </button>
        <button onClick={handleEliminar} className="text-red-600 hover:underline">
          Eliminar
        </button>
      </div>
    </div>
  );
};

export default NotaCard;
