import { useState, useEffect } from 'react';
import { crearNota, actualizarNota } from '../services/noteService';
import EmojiPicker from 'emoji-picker-react';
import { mostrarAlertaExito, mostrarError } from '../../utils/alerts';
import { SparklesIcon } from '@heroicons/react/24/outline';

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
        mostrarAlertaExito('Nota actualizada correctamente');
      } else {
        await crearNota({ titulo, nota, background });
        mostrarAlertaExito('Nota creada con éxito');
      }
      setTitulo('');
      setNota('');
      setBackground('bg-white');
      onNotaGuardada();
    } catch {
      setError('Error al guardar nota');
      mostrarError('Ocurrió un error al guardar la nota');
    }
  };

  return (
    <form onSubmit={handleSubmit} className=" border-slate-200 grid grid-cols-6 gap-2 rounded-xl p-4 text-sm">
      <h3 className="text-center text-white text-lg font-bold col-span-6">
        {notaExistente ? 'Editar Nota ✍️' : 'Nueva Nota 📝'}
      </h3>

      <input
        type="text"
        placeholder="Título..."
        value={titulo}
        onChange={e => setTitulo(e.target.value)}
        className="bg-slate-100 text-slate-600 placeholder:text-slate-600 placeholder:opacity-50 border border-slate-200 col-span-6 outline-none rounded-lg p-2 duration-300 focus:border-slate-600"
      />

      <div className="relative col-span-6">
        <textarea
          placeholder="Escribe tu nota..."
          value={nota}
          onChange={e => setNota(e.target.value)}
          className="bg-slate-100 text-slate-600 h-28 placeholder:text-slate-600 placeholder:opacity-50 border border-slate-200 w-full resize-none outline-none rounded-lg p-2 duration-300 focus:border-slate-600"
        />
        <button
          type="button"
          onClick={() => setMostrarEmojis(prev => !prev)}
          className="absolute bottom-2 left-2 text-lg hover:scale-110 transition"
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

      <div className="col-span-6">
        <p className="font-semibold text-white mb-1">Color de fondo:</p>
        <div className="flex gap-2 flex-wrap">
          {fondosDisponibles.map(color => (
            <button
              key={color}
              type="button"
              onClick={() => setBackground(color)}
              className={`w-8 h-8 rounded-full border-2 ${background === color ? 'border-pink-400' : 'border-transparent'} ${color}`}
              title={color}
            ></button>
          ))}
        </div>
      </div>

      <span className="col-span-1" />
      <button
        type="submit"
        className="bg-yellow-100 text-purple-400 stroke-pink-300 border border-pink-200 col-span-4 flex justify-center items-center gap-2 rounded-lg p-2 duration-300 hover:border-purple-400 hover:text-purple-600 focus:stroke-pink-600-200 focus:bg-pink-200"
      >
        <SparklesIcon className="h-5 w-5" />
        {notaExistente ? 'Guardar Cambios' : 'Guardar Nota'}
      </button>
      <span className="col-span-1" />

      {error && (
        <p className="col-span-6 text-red-500 text-sm text-center mt-2">{error}</p>
      )}
    </form>
  );
};

export default FormularioNota;
