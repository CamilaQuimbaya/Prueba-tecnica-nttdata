interface Props {
  total: number;
  completadas: number;
}

const IndicadorProgreso = ({ total, completadas }: Props) => {
  if (total === 0) return null;

  const porcentaje = Math.round((completadas / total) * 100);

  return (
    <div className="mb-4 p-3 bg-blue-50 border border-blue-200 rounded text-sm text-blue-700">
      ✅ Has completado <strong>{completadas}</strong> de <strong>{total}</strong> tareas
      <div className="w-full bg-blue-100 rounded-full h-2 mt-2">
        <div
          className="bg-blue-600 h-2 rounded-full"
          style={{ width: `${porcentaje}%` }}
        ></div>
      </div>
    </div>
  );
};

export default IndicadorProgreso;
