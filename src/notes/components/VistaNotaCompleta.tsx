import { CalendarDaysIcon, ClockIcon } from "@heroicons/react/24/outline";


type Nota = {
    _id: string;
    titulo: string;
    nota: string;
    completed: boolean;
    fecha: string;
    background?: string;
};

export const VistaNotaCompleta = ({ nota }: { nota: Nota }) => {
    return (
        <div className="p-4">
            {/* Círculo decorativo con color de fondo y chulo si está completada */}
            {nota.background && (
                <div
                    className={`absolute top-0 right-0 m-4 w-10 h-10 rounded-full flex items-center justify-center shadow-lg text-white font-bold text-xl ${nota.background}`}
                >
                    {nota.completed && '✓'}
                </div>
            )}
            <h2 className="text-2xl font-bold mb-2 text-white">{nota.titulo}</h2>
            <p className="mb-4 whitespace-pre-line  text-purple-200">{nota.nota}</p>
            <div className="flex items-center gap-4 text-sm">
                <span className="flex items-center gap-1">
                    <CalendarDaysIcon className="h-4 w-4" />
                    {new Date(nota.fecha).toLocaleDateString()}
                </span>
                <span className="flex items-center gap-1">
                    <ClockIcon className="h-4 w-4" />
                    {new Date(nota.fecha).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </span>
            </div>
        </div>
    );
};