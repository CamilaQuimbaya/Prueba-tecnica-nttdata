import NotaCard from './NotaCard';

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
}

const ListaNotas = ({ notas, onActualizar, onEditar }: Props) => {
  return (
    <div>
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
