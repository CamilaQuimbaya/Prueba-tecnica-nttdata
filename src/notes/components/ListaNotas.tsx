import NotaCard from './NotaCard';
import '../../styles/notaList.css'

interface Nota {
  _id: string;
  titulo: string;
  nota: string;
  completed: boolean;
  fecha: string;
}

interface Props {
  notas: Nota[];
  onActualizar: () => void;
  onEditar: (nota: Nota) => void;
  vista: 'lista' | 'grid'; // 👈 nuevo
}

const ListaNotas = ({ notas, onActualizar, onEditar, vista }: Props) => {
  return (
    <div
      className={`backgroundList p-6 rounded-lg shadow-lg grid gap-4 ${
        vista === 'grid' ? 'grid-cols-2' : 'grid-cols-1'
      }`}
    >

  {notas.map(n => (
    <NotaCard
      key={n._id}
      nota={n}
      onNotaActualizada={onActualizar}
      onEditar={onEditar}
    />
  ))}
</div>

  );
};

export default ListaNotas;
