import { useState, useEffect } from 'react';
import { crearNota, actualizarNota } from '../services/noteService';
import EmojiPicker from 'emoji-picker-react';
import Loader from '../../components/Loader';

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
  const [mostrarEmojis, setMostrarEmojis] = useState(false);
  const [guardando, setGuardando] = useState(false);

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
      setGuardando(true);
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
    } finally {
      setGuardando(false);
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
      <div className="relative">
        <textarea
          placeholder="Contenido"
          value={nota}
          onChange={e => setNota(e.target.value)}
          className="border p-2 rounded w-full h-32"
        />

        <button
          type="button"
          onClick={() => setMostrarEmojis(prev => !prev)}
          className="absolute bottom-2 left-2 text-xl hover:scale-110 transition"
          title="Insertar emoji"
        >
          😊
        </button>

        {mostrarEmojis && (
          <div className="absolute bottom-12 left-2 z-50">
            <EmojiPicker
              onEmojiClick={(emojiData) => {
                setNota(nota + emojiData.emoji);
                setMostrarEmojis(false);
              }}
              height={300}
              width={250}
            />
          </div>
        )}
      </div>
      <button
        type="submit"
        disabled={guardando}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:opacity-50 flex items-center justify-center gap-2"
      >
        {guardando ? (
          <>
            <Loader /> Guardando...
          </>
        ) : (
          notaExistente ? 'Guardar cambios' : 'Guardar'
        )}
      </button>
      {error && <p className="text-red-500 text-sm">{error}</p>}
    </form>
  );
};

export default FormularioNota;
