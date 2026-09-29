import { useState, type ChangeEvent, type FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FiMail, FiLock, FiArrowRight } from "react-icons/fi";
import { FcGoogle } from "react-icons/fc";
import { FaApple } from "react-icons/fa";
import { AuthLayout } from "../../components/layout/AuthLayout";
import { Input } from "../../components/ui/Input/Input";
import { InputPassword } from "../../components/ui/Input/InputPassword";
import { Checkbox } from "../../components/ui/Checkbox/Checkbox";
import { Button } from "../../components/ui/Button/Button";
import { IconButton } from "../../components/ui/Button/IconButton";
import { authService } from "../../services/authService";

import LoginBg from "../../assets/images/LoginBg.webp";
import Logo from "../../assets/icons/Logo-SportMatch.webp";

const Login = () => {
  const navigate = useNavigate();

  const [correo, setCorreo] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const data = await authService.login(correo, password);
      authService.saveSession(data.access_token, data.usuario, remember);
      navigate("/inicio");
    } catch (err) {
      setError(err instanceof Error ? err.message : "No se pudo iniciar sesión");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout image={LoginBg} logo={Logo}>
      <h1 className="text-3xl font-bold text-gray-900 text-left">
        INICIAR SESIÓN
      </h1>
      <p className="text-gray-500 text-base mt-2 text-left">
        Accede a tu cuenta para continuar
      </p>

      <div className="w-16 h-1 bg-brand-400 rounded-full mt-3 mb-8" />

      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        <Input
          type="email"
          placeholder="Correo electrónico"
          icon={<FiMail size={18} />}
          value={correo}
          onChange={(e: ChangeEvent<HTMLInputElement>) => setCorreo(e.target.value)}
          required
        />

        {/* Sin showStrength → sin reglas, sin bordes de color */}
        <InputPassword
          placeholder="Contraseña"
          icon={<FiLock size={18} />}
          value={password}
          onChange={(e: ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
          required
        />

        <div className="flex items-center justify-between mt-1">
          <Checkbox
            id="remember"
            label="Recordarme"
            checked={remember}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setRemember(e.target.checked)
            }
          />
          <Link
            to="/olvide-contrasena"
            className="text-sm text-brand-400 hover:underline font-medium"
          >
            ¿Olvidaste tu contraseña?
          </Link>
        </div>

        {error && (
          <p className="text-sm text-red-600 bg-red-50 border border-red-200 rounded-md px-3 py-2">
            {error}
          </p>
        )}

        <Button
          type="submit"
          variant="dark"
          icon={<FiArrowRight size={18} />}
          className="mt-4"
          disabled={loading}
        >
          {loading ? "INGRESANDO..." : "INICIAR SESIÓN"}
        </Button>
      </form>

      <div className="flex items-center gap-3 my-6">
        <div className="flex-1 h-px bg-gray-200" />
        <span className="text-xs text-gray-400 font-medium">O continúa con</span>
        <div className="flex-1 h-px bg-gray-200" />
      </div>

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

      <p className="text-center text-sm text-gray-500 mt-8">
        ¿No tienes cuenta?{" "}
        <Link to="/registro" className="text-brand-400 font-medium hover:underline">
          Regístrate aquí
        </Link>
      </p>
    </AuthLayout>
  );
};

export default Login;