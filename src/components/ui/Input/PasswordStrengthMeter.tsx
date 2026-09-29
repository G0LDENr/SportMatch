import type { PasswordEvaluation } from "../../../utils/passwordStrength";

const LEVEL_COLORS = [
  "",
  "bg-red-500",
  "bg-yellow-500",
  "bg-green-600",
] as const;

interface Props {
  evaluation: PasswordEvaluation;
  /** Si true, muestra el texto "Débil/Media/Fuerte" a la derecha */
  showLabel?: boolean;
}

export const PasswordStrengthMeter = ({
  evaluation,
  showLabel = true,
}: Props) => {
  const { level, label } = evaluation;

  return (
    <div className="flex items-center gap-2">
      <div className="flex gap-1">
        {[1, 2, 3].map((i) => (
          <span
            key={i}
            className={`w-6 h-1.5 rounded-full transition-colors ${
              level >= i ? LEVEL_COLORS[level] : "bg-gray-200"
            }`}
          />
        ))}
      </div>
      {showLabel && level > 0 && (
        <span
          className={`text-xs font-medium ${
            level === 1
              ? "text-red-500"
              : level === 2
              ? "text-yellow-500"
              : "text-green-600"
          }`}
        >
          {label}
        </span>
      )}
    </div>
  );
};