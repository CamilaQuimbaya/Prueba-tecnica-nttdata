interface Props {
  valor: string;
  onBuscar: (texto: string) => void;
}

const BarraBusqueda = ({ valor, onBuscar }: Props) => {
  return (
    <div className="mb-4 relative">
      <input
        type="text"
        placeholder="Buscar notas..."
        value={valor}
        onChange={(e) => onBuscar(e.target.value)}
        className="w-full border rounded px-10 py-2"
      />
      <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none">
        🔍
      </span>
    </div>
  );
};

export default BarraBusqueda;
