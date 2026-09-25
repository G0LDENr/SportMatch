import { ReactNode } from "react";

type CardProps = {
  children: ReactNode;
  className?: string;
};

export const Card = ({ children, className = "" }: CardProps) => {
  return (
    <div
      className={`bg-white rounded-2xl shadow-lg p-8 w-full max-w-md ${className}`}
    >
      {children}
    </div>
  );
};