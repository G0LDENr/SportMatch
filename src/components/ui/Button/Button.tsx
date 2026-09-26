import { ButtonHTMLAttributes, ReactNode } from "react";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  children: ReactNode;
  icon?: ReactNode;
  variant?: "primary" | "dark";
};

export const Button = ({
  children,
  icon,
  variant = "primary",
  className = "",
  ...props
}: ButtonProps) => {
  const styles =
    variant === "dark"
      ? "bg-black text-white hover:bg-neutral-800 active:bg-neutral-900"
      : "bg-blue-600 text-white hover:bg-blue-700 active:bg-blue-800";

  return (
    <button
      {...props}
      className={`w-full flex items-center justify-center gap-2 py-3 px-4 
                  font-semibold rounded-lg tracking-wide transition-colors
                  disabled:opacity-50 disabled:cursor-not-allowed
                  ${styles} ${className}`}
    >
      <span>{children}</span>
      {icon && <span className="flex items-center">{icon}</span>}
    </button>
  );
};