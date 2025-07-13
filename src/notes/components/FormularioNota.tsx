import { useState, useEffect } from 'react';
import { crearNota, actualizarNota } from '../services/noteService';
import EmojiPicker from 'emoji-picker-react';

interface Props {
  onNotaGuardada: () => void;
  notaExistente?: {
    _id: string;
    titulo: string;
    nota: string;
    background?: string;
  };
}

const fondosDisponibles = [
  'bg-pink-200', 'bg-yellow-200', 'bg-green-200',
  'bg-blue-200', 'bg-purple-200', 'bg-white'
];

const FormularioNota = ({ onNotaGuardada, notaExistente }: Props) => {
  const [titulo, setTitulo] = useState('');
  const [nota, setNota] = useState('');
  const [background, setBackground] = useState('bg-white');
  const [error, setError] = useState('');
  const [mostrarEmojis, setMostrarEmojis] = useState(false);

  useEffect(() => {
    if (notaExistente) {
      setTitulo(notaExistente.titulo);
      setNota(notaExistente.nota);
      setBackground(notaExistente.background || 'bg-white');
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
        await actualizarNota(notaExistente._id, { titulo, nota, background });
      } else {
        await crearNota({ titulo, nota, background });
      }
      setTitulo('');
      setNota('');
      setBackground('bg-white');
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

      <div>
        <label className="block mb-1 font-semibold">Fondo:</label>
        <div className="flex gap-2 flex-wrap">
          {fondosDisponibles.map(color => (
            <button
              key={color}
              type="button"
              onClick={() => setBackground(color)}
              className={`w-8 h-8 rounded-full border-2 ${
                background === color ? 'border-black' : 'border-transparent'
              } ${color}`}
              title={color}
            ></button>
          ))}
        </div>
      </div>

      <button
        type="submit"
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        {notaExistente ? 'Guardar cambios' : 'Guardar'}
      </button>

      {error && <p className="text-red-500 text-sm">{error}</p>}
    </form>
  );
};

export default FormularioNota;
