type Props = {
  titulo: string;
};

export default function EnConstruccion({ titulo }: Props) {
  return (
    <div className="flex items-center justify-center p-6 min-h-[60vh]">
      <div className="text-center">
        <div className="text-5xl mb-3">🚧</div>
        <h1 className="text-2xl font-bold text-slate-900">{titulo}</h1>
        <p className="text-sm text-slate-500 mt-1.5">
          Esta sección está en construcción. Vuelve pronto.
        </p>
      </div>
    </div>
  );
}