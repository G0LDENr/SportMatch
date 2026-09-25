import { Link } from "react-router-dom";
import {Button} from "../../components/ui/Button/Button";
import {Card} from "../../components/ui/Card/Card";
import { Input } from "../../components/ui/Input/Input";

const Login = () => {
    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-200 flex items-center justify-center px-4">
            <Card>
                <div className="flex flex-col items-center mb-6">
                    <h1 className="text-2xl font-bold text-slate-800">Iniciar Sesión</h1>
                    <p className="text-sm text-slate-500 mt-1">
                        Bienvenido de nuevo a Sport Match
                    </p>
                </div>

                <form className="flex flex-col gap-4">
                    <Input
                        id="email"
                        label="Correo electrónico"
                        type="email"
                        placeholder="tucorreo@ejemplo.com"
                    />

                    <Input
                        id="password"
                        label="Contraseña"
                        type="password"
                        placeholder="••••••••"
                    />

                    <Button type="submit" className="mt-2">
                        Entrar
                    </Button>
                </form>

                <p className="text-center text-sm text-slate-500 mt-6">
                    ¿No tienes cuenta?{" "}
                    <span className="text-blue-600 font-medium cursor-pointer hover:underline">
            Regístrate
          </span>
                </p>

                <p className="text-center text-xs text-slate-400 mt-4">
                    <Link to="/inicio" className="hover:underline">
                        Ir a Inicio (temporal)
                    </Link>
                </p>
            </Card>
        </div>
    );
};

export default Login;