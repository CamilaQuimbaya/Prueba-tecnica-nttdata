import { useState, useEffect } from 'react';
import { crearNota, actualizarNota } from '../services/noteService';

interface Props {
  onNotaGuardada: () => void;
  notaExistente?: {
    _id: string;
    titulo: string;
    nota: string;
  };
}

const FormularioNota = ({ onNotaGuardada, notaExistente }: Props) => {
  const [titulo, setTitulo] = useState('');
  const [nota, setNota] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    if (notaExistente) {
      setTitulo(notaExistente.titulo);
      setNota(notaExistente.nota);
    }
  }, [notaExistente]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!titulo || !nota) {
      setError('Título y contenido son obligatorios');
      return;
    }

    try {
      if (notaExistente) {
        await actualizarNota(notaExistente._id, { titulo, nota });
      } else {
        await crearNota({ titulo, nota });
      }
      setTitulo('');
      setNota('');
      onNotaGuardada();
    } catch {
      setError('Error al guardar nota');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <h3 className="text-xl font-bold">
        {notaExistente ? 'Editar nota' : 'Nueva nota'}
      </h3>
      <input
        type="text"
        placeholder="Título"
        value={titulo}
        onChange={e => setTitulo(e.target.value)}
        className="border p-2 rounded"
      />
      <textarea
        placeholder="Contenido"
        value={nota}
        onChange={e => setNota(e.target.value)}
        className="border p-2 rounded h-32"
      />
      <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
        {notaExistente ? 'Guardar cambios' : 'Guardar'}
      </button>
      {error && <p className="text-red-500 text-sm">{error}</p>}
    </form>
  );
};

export default FormularioNota;
