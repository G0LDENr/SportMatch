import { ButtonHTMLAttributes, ReactNode } from "react";

type IconButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  children: ReactNode;
  icon: ReactNode;
};

export const IconButton = ({
  children,
  icon,
  className = "",
  ...props
}: IconButtonProps) => {
  return (
    <button
      {...props}
      className={`flex-1 flex items-center justify-center gap-3 py-3 px-4
                  bg-white border border-gray-300 rounded-lg
                  text-gray-700 font-medium
                  hover:bg-gray-50 active:bg-gray-100 transition-colors
                  ${className}`}
    >
      <span className="flex items-center">{icon}</span>
      <span>{children}</span>
    </button>
  );
};