import {
  type InputHTMLAttributes,
  type ReactNode,
  useMemo,
  useState,
} from "react";
import { FiEye, FiEyeOff } from "react-icons/fi";

type Props = InputHTMLAttributes<HTMLInputElement> & {
  icon?: ReactNode;
  /** Contraseña original con la que se compara */
  original: string;
};

export const InputPasswordConfirm = ({
  icon,
  className = "",
  original,
  value,
  ...props
}: Props) => {
  const [show, setShow] = useState(false);
  const confirm = typeof value === "string" ? value : "";

  const status = useMemo<"empty" | "match" | "mismatch">(() => {
    if (confirm.length === 0) return "empty";
    return confirm === original ? "match" : "mismatch";
  }, [confirm, original]);

  const borderClass =
    status === "match"
      ? "border-green-500 focus:ring-green-500"
      : status === "mismatch"
      ? "border-red-500 focus:ring-red-500"
      : "border-gray-300 focus:ring-blue-500";

  return (
    <div className="w-full">
      <div className="relative w-full">
        {icon && (
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
            {icon}
          </span>
        )}

        <input
          {...props}
          value={value}
          type={show ? "text" : "password"}
          className={`w-full py-3 pr-10 ${icon ? "pl-10" : "pl-3"}
            border rounded-lg text-gray-800 placeholder:text-gray-400
            focus:outline-none focus:ring-2 focus:border-transparent transition
            ${borderClass}
            ${className}`}
        />

        <button
          type="button"
          onClick={() => setShow((s) => !s)}
          aria-label={show ? "Ocultar contraseña" : "Mostrar contraseña"}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
        >
          {show ? <FiEyeOff size={18} /> : <FiEye size={18} />}
        </button>
      </div>
    </div>
  );
};