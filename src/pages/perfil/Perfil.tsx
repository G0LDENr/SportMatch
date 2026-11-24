import { useState, useEffect } from 'react';
import Avatar from '../../assets/icons/Avatar.webp';
import EditProfileModal from '../../pages/perfil/EditProfileModal';
import { authService, Usuario } from '../../services/auth/authService';

const tabs = [
  { id: 'insignias', label: 'Mis Insignias' },
  { id: 'videos', label: 'Videos' },
  { id: 'amigos', label: 'Amigos' },
  { id: 'eventos', label: 'Eventos' },
];

export default function Perfil() {
  const [activeTab, setActiveTab] = useState('insignias');
  const [usuario, setUsuario] = useState<Usuario | null>(null);
  const [modalVisible, setModalVisible] = useState(false);
  const insignias = [
    {
      id: 1,
      nombre: 'Bienvenido',
      descripcion: 'Completaste tu registro',
      icono: '👋',
      desbloqueada: true,
    },
    {
      id: 2,
      nombre: 'Primeros pasos',
      descripcion: 'Completaste tu perfil',
      icono: '🌟',
      desbloqueada: true,
    },
    {
      id: 3,
      nombre: 'Social',
      descripcion: 'Agregaste a tu primer amigo',
      icono: '🤝',
      desbloqueada: false,
    },
    {
      id: 4,
      nombre: 'Explorador',
      descripcion: 'Participaste en tu primer evento',
      icono: '🏆',
      desbloqueada: false,
    },
    {
      id: 5,
      nombre: 'Creador',
      descripcion: 'Publicaste tu primer video',
      icono: '🎬',
      desbloqueada: false,
    },
    {
      id: 6,
      nombre: 'Popular',
      descripcion: 'Conseguiste 100 seguidores',
      icono: '🔥',
      desbloqueada: false,
    },
  ];


  useEffect(() => {
    const cargar = async () => {
      // 1. Datos locales + foto simulada
      const local = authService.getUser();
      const fotoSimulada = authService.getFotoPerfil();
      if (local) {
        setUsuario({ ...local, foto_perfil: fotoSimulada ?? local.foto_perfil });
      }

      // 2. Refresco desde API
      const token = authService.getToken();
      if (!token) return;

      try {
        const fresco = await authService.me();
        const conFoto: Usuario = {
          ...fresco,
          foto_perfil: fotoSimulada ?? fresco.foto_perfil,
        };
        setUsuario(conFoto);

        const remember = localStorage.getItem('access_token') !== null;
        authService.saveSession(token, conFoto, remember); // guarda conFoto
      } catch {
        // fallback a local
      }
    };
    cargar();
  }, []);

  const handleGuardarPerfil = async (data: {
    nombre_completo: string;
    nombre_usuario: string;
    foto_perfil?: string;
  }) => {
    const token = authService.getToken();
    if (!token) throw new Error('Sesión expirada. Vuelve a iniciar sesión.');

    const usuarioActualizado = await authService.actualizarPerfil({
      nombre_completo: data.nombre_completo,
      nombre_usuario: data.nombre_usuario,
    });

    // Foto simulada: persistir + avisar al Topbar
    if (data.foto_perfil) {
      authService.setFotoPerfil(data.foto_perfil);
      window.dispatchEvent(new Event('foto-perfil-actualizada'));
    }

    const conFoto: Usuario = {
      ...usuarioActualizado,
      foto_perfil: data.foto_perfil ?? authService.getFotoPerfil() ?? usuarioActualizado.foto_perfil,
    };
    setUsuario(conFoto);

    const remember = localStorage.getItem('access_token') !== null;
    authService.saveSession(token, conFoto, remember);
  };

  return (
    <div className="p-4 md:p-6">
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-4 md:p-5">
        <div className="flex flex-col md:flex-row md:items-center gap-4">
          <div className="shrink-0">
            <div className="w-20 h-20 md:w-24 md:h-24 rounded-full border-4 border-white shadow-md overflow-hidden bg-slate-200 ring-2 ring-slate-200">
              <img
                src={usuario?.foto_perfil ?? Avatar}
                alt="Foto de perfil"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          <div className="flex-1 min-w-0">
            <h1 className="text-lg md:text-xl font-bold text-slate-900">
              {usuario?.nombre_completo ?? '—'}
            </h1>
            <p className="text-sm text-slate-500 mt-0.5">
              {usuario?.nombre_usuario ? `@${usuario.nombre_usuario}` : ''}
            </p>

            <div className="mt-3 flex items-center gap-5">
              <div className="text-center md:text-left">
                <p className="text-base font-bold text-slate-900">1.2K</p>
                <p className="text-[10px] text-slate-500 uppercase tracking-wide">
                  Seguidores
                </p>
              </div>

              <div className="w-px h-8 bg-slate-200" />

              <div className="text-center md:text-left">
                <p className="text-base font-bold text-slate-900">340</p>
                <p className="text-[10px] text-slate-500 uppercase tracking-wide">
                  Siguiendo
                </p>
              </div>
            </div>
          </div>

          <div className="md:self-end md:ml-auto">
            <button
              type="button"
              onClick={() => setModalVisible(true)}
              className="w-full md:w-auto px-4 py-1.5 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-md active:scale-[0.98] transition"
            >
              Editar
            </button>
          </div>
        </div>
      </div>

      <div className="mt-4 border-b border-slate-200 flex gap-6">
        {tabs.map(({ id, label }) => {
          const active = activeTab === id;
          return (
            <button
              key={id}
              type="button"
              onClick={() => setActiveTab(id)}
              className={`relative pb-2 text-sm font-medium transition ${
                active ? 'text-slate-900' : 'text-slate-500 hover:text-slate-700'
              }`}
            >
              {label}
              {active && (
                <span className="absolute left-0 right-0 -bottom-px h-0.5 bg-blue-600 rounded-full" />
              )}
            </button>
          );
        })}
      </div>

      <div className="mt-4 bg-white rounded-xl shadow-sm border border-slate-200 p-5 min-h-[150px]">

        {activeTab === 'insignias' && (
            <div>
              <div className="flex justify-between items-center mb-5">
                <div>
                  <h2 className="text-lg font-bold text-slate-900">
                    Mis insignias
                  </h2>
                  <p className="text-sm text-slate-500">
                    Tus logros y reconocimientos
                  </p>
                </div>

                <span className="text-sm font-semibold text-blue-600">
          {insignias.filter(i => i.desbloqueada).length}/{insignias.length}
        </span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                {insignias.map(insignia => (
                    <div
                        key={insignia.id}
                        className={`rounded-xl border p-4 text-center transition ${
                            insignia.desbloqueada
                                ? 'bg-blue-50 border-blue-200'
                                : 'bg-slate-50 border-slate-200 opacity-50 grayscale'
                        }`}
                    >
                      <div className="text-4xl mb-3">
                        {insignia.icono}
                      </div>

                      <h3 className="text-sm font-bold text-slate-800">
                        {insignia.nombre}
                      </h3>

                      <p className="text-xs text-slate-500 mt-1">
                        {insignia.descripcion}
                      </p>

                      <span className={`inline-block mt-3 text-[10px] font-semibold px-2 py-1 rounded-full ${
                          insignia.desbloqueada
                              ? 'bg-blue-100 text-blue-700'
                              : 'bg-slate-200 text-slate-500'
                      }`}>
              {insignia.desbloqueada ? 'Desbloqueada' : 'Bloqueada'}
            </span>
                    </div>
                ))}
              </div>
            </div>
        )}

        {activeTab === 'videos' && (
            <p className="text-center text-sm text-slate-400">
              Aquí aparecerán tus videos.
            </p>
        )}

        {activeTab === 'amigos' && (
            <p className="text-center text-sm text-slate-400">
              Aquí aparecerán tus amigos.
            </p>
        )}

        {activeTab === 'eventos' && (
            <p className="text-center text-sm text-slate-400">
              Aquí aparecerán tus eventos.
            </p>
        )}

      </div>

      <EditProfileModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        usuario={usuario}
        onSave={handleGuardarPerfil}
      />
    </div>
  );
}