import { Link } from "react-router-dom";
import { FiMail, FiLock, FiArrowRight } from "react-icons/fi";
import { FcGoogle } from "react-icons/fc";
import { FaApple } from "react-icons/fa";
import { AuthLayout } from "../../components/layout/AuthLayout";
import { Input } from "../../components/ui/Input/Input";
import { InputPassword } from "../../components/ui/Input/InputPassword";
import { Checkbox } from "../../components/ui/Checkbox/Checkbox";
import { Button } from "../../components/ui/Button/Button";
import { IconButton } from "../../components/ui/Button/IconButton";

import LoginBg from "../../assets/images/LoginBg.webp";
import Logo from "../../assets/icons/Logo-SportMatch.webp";

const Login = () => {
  return (
    <AuthLayout image={LoginBg} logo={Logo}>
      <h1 className="text-3xl font-bold text-gray-900 text-left">
        INICIAR SESIÓN
      </h1>
      <p className="text-gray-500 text-base mt-2 text-left">
        Accede a tu cuenta para continuar
      </p>

      {/* Línea azul decorativa */}
      <div className="w-16 h-1 bg-blue-600 rounded-full mt-3 mb-8" />

      <form className="flex flex-col gap-4" onSubmit={(e) => e.preventDefault()}>
        <Input
          type="email"
          placeholder="Correo electrónico"
          icon={<FiMail size={18} />}
        />

        <InputPassword
          placeholder="Contraseña"
          icon={<FiLock size={18} />}
        />

        <div className="flex items-center justify-between mt-1">
          <Checkbox id="remember" label="Recordarme" />
          <button
            type="button"
            className="text-sm text-blue-600 hover:underline font-medium"
          >
            ¿Olvidaste tu contraseña?
          </button>
        </div>

        <Button
          type="button"
          variant="dark"
          icon={<FiArrowRight size={18} />}
          className="mt-4"
        >
          INICIAR SESIÓN
        </Button>
      </form>

      {/* Divisor */}
      <div className="flex items-center gap-3 my-6">
        <div className="flex-1 h-px bg-gray-200" />
        <span className="text-xs text-gray-400 font-medium">
          O continúa con
        </span>
        <div className="flex-1 h-px bg-gray-200" />
      </div>

      {/* Botones sociales con iconos de react-icons */}
      <div className="flex gap-3">
        <IconButton type="button" icon={<FcGoogle size={20} />}>
          Google
        </IconButton>
        <IconButton
          type="button"
          icon={<FaApple size={20} className="text-black" />}
        >
          Apple
        </IconButton>
      </div>

      {/* Footer — ÚNICO con navegación real */}
      <p className="text-center text-sm text-gray-500 mt-8">
        ¿No tienes cuenta?{" "}
        <Link to="/registro" className="text-blue-600 font-medium hover:underline">
          Regístrate aquí
        </Link>
      </p>
    </AuthLayout>
  );
};

export default Login;