import { InputHTMLAttributes, ReactNode } from "react";

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  icon?: ReactNode;
};

export const Input = ({ icon, className = "", ...props }: InputProps) => {
  return (
    <div className="relative w-full">
      {icon && (
        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
          {icon}
        </span>
      )}
      <input
        {...props}
        className={`w-full py-3 pr-3 ${icon ? "pl-10" : "pl-3"}
                    border border-gray-300 rounded-lg text-gray-800
                    placeholder:text-gray-400
                    focus:outline-none focus:ring-2 focus:ring-blue-500
                    focus:border-transparent transition
                    ${className}`}
      />
    </div>
  );
};