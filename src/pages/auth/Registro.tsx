import { useState, type ChangeEvent, type FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  FiUser,
  FiMail,
  FiLock,
  FiArrowRight,
  FiAtSign,
  FiCalendar,
  FiPhone,
  FiCheck,
} from "react-icons/fi";
import { FcGoogle } from "react-icons/fc";
import { FaApple } from "react-icons/fa";
import { AuthLayout } from "../../components/layout/AuthLayout";
import { Input } from "../../components/ui/Input/Input";
import { InputPassword } from "../../components/ui/Input/InputPassword";
import { InputPasswordConfirm } from "../../components/ui/Input/InputPasswordConfirm";
import { Checkbox } from "../../components/ui/Checkbox/Checkbox";
import { Button } from "../../components/ui/Button/Button";
import { IconButton } from "../../components/ui/Button/IconButton";
import { BackButton } from "../../components/ui/Button/BackButton";
import { Select } from "../../components/ui/Select/Select";
import { authService } from "../../services/authService";

import LoginBg from "../../assets/images/LoginBg.webp";
import Logo from "../../assets/icons/Logo-SportMatch.webp";

// ⚠️ Ajusta a tu SEXOS_VALIDOS del backend
const SEXOS = [
  { value: "masculino", label: "Masculino" },
  { value: "femenino", label: "Femenino" },
  { value: "otro", label: "Otro" },
];

const TOTAL_PASOS = 2;

const Register = () => {
  const navigate = useNavigate();

  const [paso, setPaso] = useState<1 | 2>(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [form, setForm] = useState({
    nombre_completo: "",
    nombre_usuario: "",
    correo: "",
    fecha_nacimiento: "",
    sexo: "",
    telefono: "",
    password: "",
    confirmar: "",
  });

  const [aceptaTerminos, setAceptaTerminos] = useState(false);

  const handleChange =
    (field: keyof typeof form) =>
    (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
      setForm((prev) => ({ ...prev, [field]: e.target.value }));
    };

  // ---------- Validación por paso ----------
  const validarPaso1 = (): string | null => {
    if (!form.nombre_completo.trim()) return "El nombre completo es obligatorio";
    if (!form.nombre_usuario.trim()) return "El nombre de usuario es obligatorio";
    if (form.nombre_usuario.length > 30)
      return "El nombre de usuario no puede tener más de 30 caracteres";
    if (!form.correo.trim()) return "El correo es obligatorio";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.correo))
      return "El correo no tiene un formato válido";
    if (!form.fecha_nacimiento) return "Selecciona tu fecha de nacimiento";
    if (!form.sexo) return "Selecciona tu sexo";
    return null;
  };

  const validarPaso2 = (): string | null => {
    if (form.password.length < 8)
      return "La contraseña debe tener al menos 8 caracteres";
    if (form.password !== form.confirmar)
      return "Las contraseñas no coinciden";
    if (!aceptaTerminos) return "Debes aceptar los términos y condiciones";
    return null;
  };

  // ---------- Navegación entre pasos ----------
  const siguiente = () => {
    setError("");
    const err = validarPaso1();
    if (err) return setError(err);
    setPaso(2);
  };

  const atras = () => {
    setError("");
    setPaso(1);
  };

  // ---------- Submit final ----------
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");

    const err = validarPaso2();
    if (err) return setError(err);

    setLoading(true);
    try {
      const data = await authService.register({
        nombre_completo: form.nombre_completo.trim(),
        nombre_usuario: form.nombre_usuario.trim().toLowerCase(),
        correo: form.correo.trim().toLowerCase(),
        password: form.password,
        fecha_nacimiento: form.fecha_nacimiento,
        sexo: form.sexo,
        telefono: form.telefono.trim() || undefined,
      });

      authService.saveSession(data.access_token, data.usuario, false);
      navigate("/inicio");
    } catch (err) {
      setError(err instanceof Error ? err.message : "No se pudo registrar");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout image={LoginBg} logo={Logo}>
      {/* Fila superior: reserva altura para que el título no salte entre pasos */}
      <div className="h-10 mb-2">
        {paso === 2 && <BackButton onClick={atras} disabled={loading} />}
      </div>

      <h1 className="text-3xl font-bold text-gray-900 text-left">
        CREAR CUENTA
      </h1>
      <p className="text-gray-500 text-base mt-2 text-left">
        {paso === 1
          ? "Cuéntanos un poco sobre ti"
          : "Protege tu cuenta con una contraseña"}
      </p>

      <div className="w-16 h-1 bg-brand-400 rounded-full mt-3 mb-6" />

      {/* ---------- Indicador de pasos ---------- */}
      <div className="flex items-center gap-3 mb-8">
        {[1, 2].map((n) => {
          const activo = paso === n;
          const completado = paso > n;
          return (
            <div key={n} className="flex items-center gap-2">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold transition-colors ${
                  activo
                    ? "bg-blue-600 text-white"
                    : completado
                    ? "bg-green-500 text-white"
                    : "bg-gray-200 text-gray-500"
                }`}
              >
                {completado ? <FiCheck size={16} /> : n}
              </div>
              <span
                className={`text-xs font-medium ${
                  activo ? "text-gray-900" : "text-gray-400"
                }`}
              >
                {n === 1 ? "Datos personales" : "Contraseña"}
              </span>
              {n < TOTAL_PASOS && (
                <div
                  className={`w-8 h-px ${
                    paso > n ? "bg-green-500" : "bg-gray-200"
                  }`}
                />
              )}
            </div>
          );
        })}
      </div>

      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        {/* ---------- PASO 1 ---------- */}
        {paso === 1 && (
          <>
            <Input
              type="text"
              placeholder="Nombre completo"
              icon={<FiUser size={18} />}
              value={form.nombre_completo}
              onChange={handleChange("nombre_completo")}
              required
            />

            <Input
              type="text"
              placeholder="Nombre de usuario"
              icon={<FiAtSign size={18} />}
              value={form.nombre_usuario}
              onChange={handleChange("nombre_usuario")}
              maxLength={30}
              required
            />

            <Input
              type="email"
              placeholder="Correo electrónico"
              icon={<FiMail size={18} />}
              value={form.correo}
              onChange={handleChange("correo")}
              required
            />

            <Input
              type="date"
              placeholder="Fecha de nacimiento"
              icon={<FiCalendar size={18} />}
              value={form.fecha_nacimiento}
              onChange={handleChange("fecha_nacimiento")}
              required
            />

            <Select
              options={SEXOS}
              placeholder="Selecciona tu sexo"
              value={form.sexo}
              onChange={handleChange("sexo")}
              required
            />

            <Input
              type="tel"
              placeholder="Teléfono (opcional)"
              icon={<FiPhone size={18} />}
              value={form.telefono}
              onChange={handleChange("telefono")}
            />

            {error && (
              <p className="text-sm text-red-600 bg-red-50 border border-red-200 rounded-md px-3 py-2">
                {error}
              </p>
            )}

            <Button
              type="button"
              variant="dark"
              icon={<FiArrowRight size={18} />}
              className="mt-4"
              onClick={siguiente}
            >
              CONTINUAR
            </Button>
          </>
        )}

        {/* ---------- PASO 2 ---------- */}
        {paso === 2 && (
          <>
            <InputPassword
              placeholder="Contraseña"
              icon={<FiLock size={18} />}
              value={form.password}
              onChange={handleChange("password")}
              showStrength
              required
            />

            <InputPasswordConfirm
              placeholder="Confirmar contraseña"
              icon={<FiLock size={18} />}
              value={form.confirmar}
              onChange={handleChange("confirmar")}
              original={form.password}
              required
            />

            <div className="mt-1">
              <Checkbox
                id="terms"
                label="Acepto los términos y condiciones"
                checked={aceptaTerminos}
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  setAceptaTerminos(e.target.checked)
                }
              />
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
              disabled={loading}
              className="mt-4"
            >
              {loading ? "REGISTRANDO..." : "REGISTRARSE"}
            </Button>
          </>
        )}
      </form>

      {/* Divisor + sociales solo en paso 1 */}
      {paso === 1 && (
        <>
          <div className="flex items-center gap-3 my-6">
            <div className="flex-1 h-px bg-gray-200" />
            <span className="text-xs text-gray-400 font-medium">
              O regístrate con
            </span>
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
        </>
      )}

      <p className="text-center text-sm text-gray-500 mt-8">
        ¿Ya tienes cuenta?{" "}
        <Link to="/" className="text-brand-400 font-medium hover:underline">
          Inicia sesión aquí
        </Link>
      </p>
    </AuthLayout>
  );
};

export default Register;