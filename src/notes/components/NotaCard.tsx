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
    <div style={{ border: '1px solid gray', padding: '1rem', margin: '1rem 0' }}>
      <h4>{nota.titulo}</h4>
      <p>{nota.nota}</p>
      <p>Estado: {nota.completed ? '✅ Completada' : '❌ Pendiente'}</p>
      <small>{new Date(nota.fecha).toLocaleString()}</small>
      <br />
      <button onClick={toggleEstado}>
        Marcar como {nota.completed ? 'pendiente' : 'completada'}
      </button>{' '}
      <button onClick={() => onEditar(nota)}>Editar</button>{' '}
      <button onClick={handleEliminar} style={{ color: 'red' }}>
        Eliminar
      </button>
    </div>
  );
};

export default NotaCard;