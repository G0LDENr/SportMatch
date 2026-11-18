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
  foto_perfil?: string | null; // SIMULADO
}

export interface AuthResponse {
  access_token: string;
  usuario: Usuario;
}

export interface RegisterPayload {
  nombre_completo: string;
  nombre_usuario: string;
  correo: string;
  password: string;
  fecha_nacimiento: string;
  sexo: string;
  telefono?: string;
  ciudad_id?: number;
}

const API_URL = process.env.REACT_APP_API_URL ?? "http://localhost:5000";

const TOKEN_KEY = "access_token";
const USER_KEY = "usuario";
const FOTO_KEY = "foto_perfil"; // SIMULADO

function getToken(): string | null {
  return (
    sessionStorage.getItem(TOKEN_KEY) ??
    localStorage.getItem(TOKEN_KEY)
  );
}

function getUser(): Usuario | null {
  const raw =
    sessionStorage.getItem(USER_KEY) ??
    localStorage.getItem(USER_KEY);
  return raw ? (JSON.parse(raw) as Usuario) : null;
}

interface RequestOptions {
  method?: "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
  body?: unknown;
  auth?: boolean;
}

async function request<T>(path: string, options: RequestOptions = {}): Promise<T> {
  const { method = "GET", body, auth = false } = options;
  const headers: Record<string, string> = { "Content-Type": "application/json" };

  if (auth) {
    const token = getToken();
    if (token) headers.Authorization = `Bearer ${token}`;
  }

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

export const authService = {
  saveSession(token: string, usuario: Usuario, remember: boolean): void {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(USER_KEY);
    sessionStorage.removeItem(TOKEN_KEY);
    sessionStorage.removeItem(USER_KEY);

    const storage = remember ? localStorage : sessionStorage;
    storage.setItem(TOKEN_KEY, token);
    storage.setItem(USER_KEY, JSON.stringify(usuario));
    // ⚠️ NO se toca FOTO_KEY aquí: la foto simulada es independiente
  },

  getToken,
  getUser,

  isAuthenticated(): boolean {
    return getToken() !== null;
  },

  logout(): void {
    [localStorage, sessionStorage].forEach((s) => {
      s.removeItem(TOKEN_KEY);
      s.removeItem(USER_KEY);
    });
    localStorage.removeItem(FOTO_KEY); // 👈 limpia la foto simulada
  },

  login(correo: string, password: string): Promise<AuthResponse> {
    return request<AuthResponse>("/api/auth/login", {
      method: "POST",
      body: { correo, password },
    });
  },

  register(payload: RegisterPayload): Promise<AuthResponse> {
    return request<AuthResponse>("/api/auth/register", {
      method: "POST",
      body: payload,
    });
  },

  olvideContrasena(correo: string): Promise<{ mensaje: string; token_reseteo?: string }> {
    return request("/api/auth/olvide-contrasena", {
      method: "POST",
      body: { correo },
    });
  },

  restablecerContrasena(token: string, nueva_password: string): Promise<{ mensaje: string }> {
    return request("/api/auth/restablecer-contrasena", {
      method: "POST",
      body: { token, nueva_password },
    });
  },

  me(): Promise<Usuario> {
    return request<Usuario>("/api/auth/me", { auth: true });
  },

  actualizarPerfil(payload: {
    nombre_completo?: string;
    nombre_usuario?: string;
  }): Promise<Usuario> {
    return request<Usuario>("/api/usuarios/me", {
      method: "PUT",
      body: payload,
      auth: true,
    });
  },

  // ===== SIMULACIÓN DE FOTO DE PERFIL =====
  getFotoPerfil(): string | null {
    return localStorage.getItem(FOTO_KEY);
  },

  setFotoPerfil(url: string | null): void {
    if (url) localStorage.setItem(FOTO_KEY, url);
    else localStorage.removeItem(FOTO_KEY);
  },
};