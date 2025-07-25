import NotaCard from './NotaCard';
import { motion, AnimatePresence } from 'framer-motion';
import '../../styles/notaList.css';
import { useState } from 'react';
import Modal from '../../components/Modal';
import { VistaNotaCompleta } from './VistaNotaCompleta';

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
  vista: 'lista' | 'grid';
}

const ListaNotas = ({ notas, onActualizar, onEditar, vista }: Props) => {
  const [notaSeleccionada, setNotaSeleccionada] = useState<Nota | null>(null);
  if (notas.length === 0) return null; // 👈 Ocultar si no hay notas
  return (
    <motion.div
      layout
      className={`backgroundList p-6 rounded-lg shadow-lg grid gap-4 ${vista === 'grid' ? 'grid-cols-2' : 'grid-cols-1'
        }`}
    >
      <AnimatePresence mode="popLayout">
        {notas.map((n) => (
          <motion.div
            key={n._id}
            layout
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.5 }}
          >
            <NotaCard
              nota={n}
              onNotaActualizada={onActualizar}
              onEditar={onEditar}
              onVerDetalle={(nota) => setNotaSeleccionada(nota)}
            />
          </motion.div>
        ))}
      </AnimatePresence>
      <Modal open={!!notaSeleccionada} onClose={() => setNotaSeleccionada(null)}>
        {notaSeleccionada && <VistaNotaCompleta nota={notaSeleccionada} />}
      </Modal>

    </motion.div>
  );
};

export default ListaNotas;
