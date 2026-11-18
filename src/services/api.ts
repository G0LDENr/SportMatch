export const API_URL = import.meta.env.VITE_API_URL ?? "http://localhost:5000";

export interface Usuario {
  id: number;
  nombre_completo: string;
  nombre_usuario: string;
  correo: string;
  rol: string;
  telefono?: string | null;
  sexo?: string | null;
  fecha_de_nacimiento?: string | null;
  ciudad_id?: number | null;
  estado_cuenta: string;
  ultimo_acceso?: string | null;
  registro_completo_en?: string | null;
  // agrega aquí el resto de campos que devuelva tu to_dict()
}

export interface LoginResponse {
  access_token: string;
  usuario: Usuario;
}

interface RequestOptions {
  method?: "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
  body?: unknown;
  token?: string | null;
}

async function request<T>(path: string, options: RequestOptions = {}): Promise<T> {
  const { method = "GET", body, token } = options;

  const headers: Record<string, string> = { "Content-Type": "application/json" };
  if (token) headers.Authorization = `Bearer ${token}`;

  const res = await fetch(`${API_URL}${path}`, {
    method,
    headers,
    body: body ? JSON.stringify(body) : undefined,
  });

  const data = (await res.json().catch(() => ({}))) as Record<string, unknown>;

  if (!res.ok) {
    const message =
      typeof data.error === "string" ? data.error : `Error ${res.status}`;
    throw new Error(message);
  }

  return data as T;
}

export const authApi = {
  login: (correo: string, password: string) =>
    request<LoginResponse>("/api/auth/login", {
      method: "POST",
      body: { correo, password },
    }),

  register: (payload: {
    nombre_completo: string;
    nombre_usuario: string;
    correo: string;
    password: string;
    fecha_nacimiento: string; // "YYYY-MM-DD"
    sexo: string;
    telefono?: string;
    ciudad_id?: number;
  }) =>
    request<LoginResponse>("/api/auth/register", {
      method: "POST",
      body: payload,
    }),

  olvideContrasena: (correo: string) =>
    request<{ mensaje: string; token_reseteo?: string }>(
      "/api/auth/olvide-contrasena",
      { method: "POST", body: { correo } }
    ),

  restablecerContrasena: (token: string, nueva_password: string) =>
    request<{ mensaje: string }>("/api/auth/restablecer-contrasena", {
      method: "POST",
      body: { token, nueva_password },
    }),

  me: (token: string) => request<Usuario>("/api/auth/me", { token }),
};