import type { SelectHTMLAttributes, ReactNode } from "react";
import { FiChevronDown } from "react-icons/fi";

export interface SelectOption {
  value: string;
  label: string;
}

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  icon?: ReactNode;
  options: SelectOption[];
  placeholder?: string;
  error?: string;
}

export const Select = ({
  icon,
  options,
  placeholder,
  error,
  className = "",
  ...props
}: SelectProps) => {
  return (
    <div className="w-full">
      <div className="relative">
        {/* Icono izquierdo */}
        {icon && (
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">
            {icon}
          </span>
        )}

        <select
          {...props}
          className={`
            w-full
            h-12
            rounded-lg
            border
            bg-white
            text-sm
            text-gray-900
            appearance-none
            transition-colors
            focus:outline-none
            focus:ring-2
            focus:ring-blue-500/30
            focus:border-blue-600
            disabled:bg-gray-50
            disabled:text-gray-400
            disabled:cursor-not-allowed
            ${icon ? "pl-10" : "pl-4"}
            pr-10
            ${
              error
                ? "border-red-400 focus:border-red-500 focus:ring-red-500/20"
                : "border-gray-200 hover:border-gray-300"
            }
            ${className}
          `}
        >
          {placeholder && (
            <option value="" disabled>
              {placeholder}
            </option>
          )}
          {options.map((o) => (
            <option key={o.value} value={o.value}>
              {o.label}
            </option>
          ))}
        </select>

        {/* Flecha derecha personalizada */}
        <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">
          <FiChevronDown size={18} />
        </span>
      </div>

      {error && (
        <p className="text-xs text-red-600 mt-1 text-left">{error}</p>
      )}
    </div>
  );
};