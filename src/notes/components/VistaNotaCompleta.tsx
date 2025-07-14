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
        <div className="p-4 text-purple-100">
            <h2 className="text-2xl font-bold mb-2">{nota.titulo}</h2>
            <p className="mb-4 whitespace-pre-line">{nota.nota}</p>
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