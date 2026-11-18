export type PasswordLevel = 0 | 1 | 2 | 3; // 0 = vacío, 1 = débil, 2 = media, 3 = fuerte

export interface PasswordRule {
  key: string;
  label: string;
  test: (pwd: string) => boolean;
}

export interface PasswordEvaluation {
  level: PasswordLevel;
  label: "Vacío" | "Débil" | "Media" | "Fuerte";
  rules: { key: string; label: string; passed: boolean }[];
}

export const PASSWORD_RULES: PasswordRule[] = [
  { key: "length", label: "Al menos 8 caracteres", test: (p) => p.length >= 8 },
  { key: "uppercase", label: "Al menos una mayúscula", test: (p) => /[A-Z]/.test(p) },
  { key: "lowercase", label: "Al menos una minúscula", test: (p) => /[a-z]/.test(p) },
  { key: "number", label: "Al menos un número", test: (p) => /\d/.test(p) },
  { key: "symbol", label: "Al menos un símbolo (!@#$...)", test: (p) => /[^A-Za-z0-9]/.test(p) },
];

export function evaluarPassword(password: string): PasswordEvaluation {
  const rules = PASSWORD_RULES.map((r) => ({
    key: r.key,
    label: r.label,
    passed: r.test(password),
  }));

  const passedCount = rules.filter((r) => r.passed).length;

  let level: PasswordLevel = 0;
  if (password.length === 0) level = 0;
  else if (passedCount <= 2) level = 1;       // débil
  else if (passedCount <= 3) level = 2;       // media
  else level = 3;                              // fuerte (4-5 cumplidas)

  // Regla especial: si no cumple longitud, nunca puede ser "fuerte"
  if (!rules.find((r) => r.key === "length")?.passed && level === 3) {
    level = 2;
  }

  const labels: Record<PasswordLevel, PasswordEvaluation["label"]> = {
    0: "Vacío",
    1: "Débil",
    2: "Media",
    3: "Fuerte",
  };

  return { level, label: labels[level], rules };
}

/** Devuelve las clases Tailwind del borde según el nivel */
export function borderClassByLevel(level: PasswordLevel, base = "border-gray-300"): string {
  switch (level) {
    case 1:
      return "border-red-500 focus:ring-red-500";
    case 2:
      return "border-yellow-400 focus:ring-yellow-400";
    case 3:
      return "border-green-500 focus:ring-green-500";
    default:
      return `${base} focus:ring-blue-500`;
  }
}