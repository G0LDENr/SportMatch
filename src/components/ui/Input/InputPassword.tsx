import {
  type InputHTMLAttributes,
  type ReactNode,
  useState,
} from "react";
import { FiEye, FiEyeOff, FiCheck, FiCircle } from "react-icons/fi";
import {
  evaluarPassword,
  borderClassByLevel,
  type PasswordEvaluation,
} from "../../../utils/passwordStrength";

type InputPasswordProps = InputHTMLAttributes<HTMLInputElement> & {
  icon?: ReactNode;
  /** Muestra las reglas de seguridad y el borde dinámico */
  showStrength?: boolean;
};

const EMPTY_EVAL: PasswordEvaluation = {
  level: 0,
  label: "Vacío",
  rules: [],
};

export const InputPassword = ({
  icon,
  className = "",
  showStrength = false,
  value,
  ...props
}: InputPasswordProps) => {
  const [show, setShow] = useState(false);

  const password = typeof value === "string" ? value : "";

  // Solo evaluamos si showStrength está activo
  const evaluation = showStrength ? evaluarPassword(password) : EMPTY_EVAL;

  // Borde: dinámico solo si showStrength; si no, gris fijo
  const borderClass = showStrength
    ? borderClassByLevel(evaluation.level)
    : "border-gray-300 focus:ring-blue-500";

  const showRules =
    showStrength && password.length > 0 && evaluation.level < 3;

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

      {showRules && (
        <ul className="mt-2 space-y-1">
          {evaluation.rules.map((rule) => (
            <li
              key={rule.key}
              className={`flex items-center gap-2 text-xs transition-colors ${
                rule.passed ? "text-green-600" : "text-gray-400"
              }`}
            >
              {rule.passed ? (
                <FiCheck size={14} className="shrink-0" />
              ) : (
                <FiCircle size={10} className="shrink-0" />
              )}
              <span className={rule.passed ? "line-through" : ""}>
                {rule.label}
              </span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};