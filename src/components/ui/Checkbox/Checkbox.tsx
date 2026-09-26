import { InputHTMLAttributes } from "react";

type CheckboxProps = InputHTMLAttributes<HTMLInputElement> & {
  label: string;
};

export const Checkbox = ({ label, id, className = "", ...props }: CheckboxProps) => {
  return (
    <label
      htmlFor={id}
      className={`flex items-center gap-2 text-sm text-gray-600 cursor-pointer select-none ${className}`}
    >
      <input
        id={id}
        type="checkbox"
        {...props}
        className="w-4 h-4 accent-blue-600 cursor-pointer"
      />
      <span>{label}</span>
    </label>
  );
};