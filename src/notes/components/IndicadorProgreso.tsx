import { motion } from 'framer-motion';

interface Props {
  total: number;
  completadas: number;
}

const IndicadorProgreso = ({ total, completadas }: Props) => {
  if (total === 0) return null;

  const porcentaje = Math.round((completadas / total) * 100);

  const getColor = () => {
    if (porcentaje < 30) return 'bg-red-500';
    if (porcentaje < 70) return 'bg-yellow-400';
    return 'bg-green-500';
  };

  return (
    <div className="mb-4 p-3 bg-blue-50 border border-blue-200 rounded text-sm text-blue-700">
      ✅ Has completado <strong>{completadas}</strong> de <strong>{total}</strong> tareas
      <div className="w-full bg-blue-100 rounded-full h-2 mt-2 overflow-hidden">
        <motion.div
          className={`h-2 rounded-full ${getColor()}`}
          initial={{ width: 0 }}
          animate={{ width: `${porcentaje}%` }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        />
      </div>
    </div>
  );
};

export default IndicadorProgreso;
