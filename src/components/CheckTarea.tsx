interface Props {
  checked: boolean;
  onChange: () => void;
  id: string;
}

// Componente CheckTarea
// Este componente es un checkbox estilizado que se utiliza para marcar tareas como completadas
// Recibe tres props: checked (booleano que indica si la tarea está completada),
// onChange (función que se ejecuta al cambiar el estado del checkbox) e id
// (string que identifica el checkbox)
// Utiliza Tailwind CSS para el estilo y SVG para mostrar un icono de verificación

const CheckTarea = ({ checked, onChange, id }: Props) => {
  return (
    <label
      htmlFor={id}
      className="relative h-[3em] w-[3em] rounded-[1.2em] bg-[#b3fffa] shadow-[inset_-1px_1px_4px_0px_#f0fffe,inset_1px_-1px_4px_0px_#00bdb0,-1px_2px_4px_0px_#00bdb0] cursor-pointer"
    >
      <input
        type="checkbox"
        id={id}
        checked={checked}
        onChange={onChange}
        className="peer appearance-none"
      />
      <span
        className="absolute left-1/2 top-1/2 h-[2em] w-[2em] -translate-x-1/2 -translate-y-1/2 rounded-[0.8em] bg-[#ccfffc] shadow-[inset_-1px_1px_4px_0px_#f0fffe,inset_1px_-1px_4px_0px_#00bdb0,-1px_1px_2px_0px_#00bdb0] duration-200 peer-checked:shadow-[inset_1px_-1px_4px_0px_#f0fffe,inset_-1px_1px_4px_0px_#00bdb0]"
      ></span>

      {/* ✅ Mostrar solo el chulo cuando está marcada */}
      <svg
        fill="#00756d"
        viewBox="-3.2 -3.2 38.40 38.40"
        xmlns="http://www.w3.org/2000/svg"
        className="absolute left-1/2 top-1/2 h-[2em] w-[2em] -translate-x-1/2 -translate-y-1/2 opacity-0 peer-checked:opacity-100 transition-opacity"
      >
        <path d="M5 16.577l2.194-2.195 5.486 5.484L24.804 7.743 27 9.937l-14.32 14.32z" />
      </svg>
    </label>
  );
};

export default CheckTarea;
