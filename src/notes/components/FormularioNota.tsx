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
    <form onSubmit={handleSubmit}>
      <h3>{notaExistente ? 'Editar nota' : 'Nueva nota'}</h3>
      <input
        type="text"
        placeholder="Título"
        value={titulo}
        onChange={e => setTitulo(e.target.value)}
      />
      <textarea
        placeholder="Contenido"
        value={nota}
        onChange={e => setNota(e.target.value)}
      />
      <button type="submit">{notaExistente ? 'Guardar cambios' : 'Guardar'}</button>
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </form>
  );
};

export default FormularioNota;
