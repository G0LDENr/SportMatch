import { InputHTMLAttributes, ReactNode, useState } from "react";
import { FiEye, FiEyeOff } from "react-icons/fi";

type InputPasswordProps = InputHTMLAttributes<HTMLInputElement> & {
  icon?: ReactNode;
};

export const InputPassword = ({
  icon,
  className = "",
  ...props
}: InputPasswordProps) => {
  const [show, setShow] = useState(false);

  return (
    <div className="relative w-full">
      {icon && (
        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
          {icon}
        </span>
      )}
      <input
        {...props}
        type={show ? "text" : "password"}
        className={`w-full py-3 pr-10 ${icon ? "pl-10" : "pl-3"}
                    border border-gray-300 rounded-lg text-gray-800
                    placeholder:text-gray-400
                    focus:outline-none focus:ring-2 focus:ring-blue-500
                    focus:border-transparent transition
                    ${className}`}
      />
      <button
        type="button"
        onClick={() => setShow((s) => !s)}
        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
      >
        {show ? <FiEyeOff size={18} /> : <FiEye size={18} />}
      </button>
    </div>
  );
};