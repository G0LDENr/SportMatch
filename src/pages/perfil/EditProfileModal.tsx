import { useEffect, useState } from 'react';
import { LuX, LuUser, LuAtSign } from 'react-icons/lu';
import Avatar from '../../assets/icons/Avatar.webp';
import AvatarPicker from './AvatarPicker';

type Props = {
  visible: boolean;
  onClose: () => void;
  usuario: any;
  onSave: (data: {
    nombre_completo: string;
    nombre_usuario: string;
    foto_perfil?: string;
  }) => Promise<void>;
};

export default function EditProfileModal({
  visible,
  onClose,
  usuario,
  onSave,
}: Props) {
  const [nombre, setNombre] = useState('');
  const [nombreUsuario, setNombreUsuario] = useState('');
  const [foto, setFoto] = useState<string>('');
  const [pickerOpen, setPickerOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (visible && usuario) {
      setNombre(usuario.nombre_completo ?? '');
      setNombreUsuario(usuario.nombre_usuario ?? '');
      setFoto(usuario.foto_perfil ?? '');
      setError('');
      setPickerOpen(false);
    }
  }, [visible, usuario]);

  const handleCambioUsuario = (text: string) => {
    const limpio = text.toLowerCase().replace(/[^a-z0-9_.]/g, '');
    setNombreUsuario(limpio);
  };

  const handleGuardar = async () => {
    if (!nombre.trim() || !nombreUsuario.trim()) {
      setError('Nombre y nombre de usuario son obligatorios.');
      return;
    }
    if (nombreUsuario.length < 3) {
      setError('El nombre de usuario debe tener al menos 3 caracteres.');
      return;
    }

    try {
      setLoading(true);
      setError('');
      await onSave({
        nombre_completo: nombre.trim(),
        nombre_usuario: nombreUsuario.trim(),
        foto_perfil: foto || undefined,
      });
      onClose();
    } catch (e: any) {
      setError(e?.message || 'Error al guardar');
    } finally {
      setLoading(false);
    }
  };

  if (!visible) return null;

  return (
    <>
      <div
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
        onClick={onClose}
      >
        <div
          className="bg-white rounded-2xl shadow-xl w-full max-w-md p-6"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-bold text-slate-900">Editar perfil</h2>
            <button
              onClick={onClose}
              className="p-1.5 rounded-md hover:bg-slate-100 text-slate-500 transition"
            >
              <LuX className="text-lg" />
            </button>
          </div>

          <div className="flex flex-col items-center mb-6">
            <div className="w-24 h-24 rounded-full overflow-hidden ring-4 ring-slate-100 bg-slate-200">
              <img
                src={foto || usuario?.foto_perfil || Avatar}
                alt="Perfil"
                className="w-full h-full object-cover"
              />
            </div>
            <button
              type="button"
              onClick={() => setPickerOpen(true)}
              className="mt-3 text-sm font-medium text-[#03bddb] hover:underline"
            >
              Cambiar foto
            </button>
          </div>

          <div className="mb-4">
            <label className="block text-sm font-semibold text-slate-700 mb-1.5">
              Nombre completo
            </label>
            <div className="relative">
              <LuUser className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-base" />
              <input
                type="text"
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
                placeholder="Tu nombre"
                className="w-full pl-10 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#03bddb] transition"
              />
            </div>
          </div>

          <div className="mb-4">
            <label className="block text-sm font-semibold text-slate-700 mb-1.5">
              Nombre de usuario
            </label>
            <div className="relative">
              <LuAtSign className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-base" />
              <input
                type="text"
                value={nombreUsuario}
                onChange={(e) => handleCambioUsuario(e.target.value)}
                placeholder="usuario"
                className="w-full pl-10 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#03bddb] transition"
              />
            </div>
            <p className="text-xs text-slate-400 mt-1.5">
              Solo minúsculas, números, puntos y guiones bajos
            </p>
          </div>

          {error && (
            <div className="mb-4 px-3 py-2 bg-red-50 border border-red-200 rounded-lg text-xs text-red-600">
              {error}
            </div>
          )}

          <div className="flex gap-2 mt-6">
            <button
              onClick={onClose}
              className="flex-1 px-4 py-2 border border-slate-200 rounded-lg text-sm font-medium text-slate-700 hover:bg-slate-50 transition"
            >
              Cancelar
            </button>
            <button
              onClick={handleGuardar}
              disabled={loading}
              className="flex-1 px-4 py-2 bg-blue-600 hover:bg-blue-700 disabled:opacity-60 text-white text-sm font-medium rounded-lg transition"
            >
              {loading ? 'Guardando...' : 'Guardar'}
            </button>
          </div>
        </div>
      </div>

      {pickerOpen && (
        <AvatarPicker
          seleccionado={foto}
          onSelect={(url) => setFoto(url)}
          onClose={() => setPickerOpen(false)}
        />
      )}
    </>
  );
}