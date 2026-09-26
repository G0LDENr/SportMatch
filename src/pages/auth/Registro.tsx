import { Link } from "react-router-dom";
import { FiUser, FiMail, FiLock, FiArrowRight } from "react-icons/fi";
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

const Register = () => {
  return (
    <AuthLayout image={LoginBg} logo={Logo}>
      <h1 className="text-3xl font-bold text-gray-900 text-left">
        CREAR CUENTA
      </h1>
      <p className="text-gray-500 text-base mt-2 text-left">
        Regístrate para comenzar en Sport Match
      </p>

      {/* Línea azul decorativa */}
      <div className="w-16 h-1 bg-blue-600 rounded-full mt-3 mb-8" />

      <form className="flex flex-col gap-4" onSubmit={(e) => e.preventDefault()}>
        <Input
          type="text"
          placeholder="Nombre completo"
          icon={<FiUser size={18} />}
        />

        <Input
          type="email"
          placeholder="Correo electrónico"
          icon={<FiMail size={18} />}
        />

        <InputPassword
          placeholder="Contraseña"
          icon={<FiLock size={18} />}
        />

        <InputPassword
          placeholder="Confirmar contraseña"
          icon={<FiLock size={18} />}
        />

        <div className="mt-1">
          <Checkbox
            id="terms"
            label="Acepto los términos y condiciones"
          />
        </div>

        <Button
          type="button"
          variant="dark"
          icon={<FiArrowRight size={18} />}
          className="mt-4"
        >
          REGISTRARSE
        </Button>
      </form>

      {/* Divisor */}
      <div className="flex items-center gap-3 my-6">
        <div className="flex-1 h-px bg-gray-200" />
        <span className="text-xs text-gray-400 font-medium">
          O regístrate con
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

      {/* Footer — navegación real al Login */}
      <p className="text-center text-sm text-gray-500 mt-8">
        ¿Ya tienes cuenta?{" "}
        <Link to="/" className="text-blue-600 font-medium hover:underline">
          Inicia sesión aquí
        </Link>
      </p>
    </AuthLayout>
  );
};

export default Register;