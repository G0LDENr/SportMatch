import type { ButtonHTMLAttributes } from "react";
import { FiArrowLeft } from "react-icons/fi";

interface BackButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  label?: string;
}

export const BackButton = ({
  label = "Volver",
  className = "",
  ...props
}: BackButtonProps) => {
  return (
    <button
      type="button"
      aria-label={label}
      {...props}
      className={`
        inline-flex items-center justify-center
        w-10 h-10
        rounded-full
        text-gray-600
        bg-white
        border border-gray-200
        transition-colors
        hover:bg-gray-50 hover:text-gray-900 hover:border-gray-300
        focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-600
        disabled:opacity-50 disabled:cursor-not-allowed
        ${className}
      `}
    >
      <FiArrowLeft size={20} />
    </button>
  );
};