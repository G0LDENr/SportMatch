import { ReactNode } from "react";

type AuthLayoutProps = {
  children: ReactNode;
  image: string;
  logo: string;
};

export const AuthLayout = ({ children, image, logo }: AuthLayoutProps) => {
  return (
    <div className="min-h-screen flex">
      {/* Lado izquierdo: imagen + logo centrado */}
      <div
        className="hidden md:flex w-1/2 relative bg-cover bg-center"
        style={{ backgroundImage: `url(${image})` }}
      >
        <div className="absolute inset-0 bg-black/40" />
        <div className="relative z-10 flex items-center justify-center w-full">
          <img src={logo} alt="Logo" className="w-[450px] h-[450px] object-contain" />
        </div>
      </div>

      {/* Lado derecho: formulario */}
      <div className="w-full md:w-1/2 flex items-center justify-center bg-white px-6 py-10">
        <div className="w-full max-w-md">{children}</div>
      </div>
    </div>
  );
};