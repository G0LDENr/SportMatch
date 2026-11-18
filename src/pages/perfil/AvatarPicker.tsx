import { LuCheck, LuX } from 'react-icons/lu';

export const AVATARES_DISPONIBLES = [
  { id: 'avatar1', url: 'https://i.pravatar.cc/150?img=1' },
  { id: 'avatar2', url: 'https://i.pravatar.cc/150?img=5' },
  { id: 'avatar3', url: 'https://i.pravatar.cc/150?img=12' },
  { id: 'avatar4', url: 'https://i.pravatar.cc/150?img=32' },
  { id: 'avatar5', url: 'https://i.pravatar.cc/150?img=45' },
];

type Props = {
  seleccionado: string;
  onSelect: (url: string) => void;
  onClose: () => void;
};

export default function AvatarPicker({ seleccionado, onSelect, onClose }: Props) {
  return (
    <div
      className="fixed inset-0 z-[60] flex items-center justify-center bg-black/60 p-4"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-2xl shadow-xl w-full max-w-sm p-5"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start justify-between mb-1">
          <div>
            <h3 className="text-base font-bold text-slate-900">Elige una foto</h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Selecciona uno de los avatares disponibles
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-md hover:bg-slate-100 text-slate-500 transition"
          >
            <LuX className="text-lg" />
          </button>
        </div>

        <div className="grid grid-cols-3 gap-3 mt-5">
          {AVATARES_DISPONIBLES.map((av) => {
            const activo = seleccionado === av.url;
            return (
              <button
                key={av.id}
                type="button"
                onClick={() => {
                  onSelect(av.url);
                  onClose();
                }}
                className={`relative rounded-full overflow-hidden aspect-square ring-2 transition ${
                  activo
                    ? 'ring-[#03bddb] scale-105'
                    : 'ring-transparent hover:ring-slate-300'
                }`}
              >
                <img src={av.url} alt={av.id} className="w-full h-full object-cover" />
                {activo && (
                  <span className="absolute inset-0 bg-[#03bddb]/30 flex items-center justify-center">
                    <LuCheck className="text-white text-xl drop-shadow" />
                  </span>
                )}
              </button>
            );
          })}
        </div>

        <button
          onClick={onClose}
          className="mt-5 w-full px-4 py-2 border border-slate-200 rounded-lg text-sm font-medium text-slate-700 hover:bg-slate-50 transition"
        >
          Cancelar
        </button>
      </div>
    </div>
  );
}