import { useEffect, useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import Sidebar from './Sidebar';
import Topbar from './Topbar';
import Avatar from '../../assets/icons/Avatar.webp';
import { authService } from '../../services/auth/authService';

export default function AppLayout() {
  const navigate = useNavigate();
  const [fotoPerfil, setFotoPerfil] = useState<string | null>(() =>
    authService.getFotoPerfil()
  );

  useEffect(() => {
    const recargar = () => setFotoPerfil(authService.getFotoPerfil());

    const onStorage = (e: StorageEvent) => {
      if (e.key === 'foto_perfil') recargar();
    };
    const onCustom = () => recargar();

    window.addEventListener('storage', onStorage);
    window.addEventListener('foto-perfil-actualizada', onCustom);

    return () => {
      window.removeEventListener('storage', onStorage);
      window.removeEventListener('foto-perfil-actualizada', onCustom);
    };
  }, []);

  const handleNavigate = (id: string) => {
    switch (id) {
      case 'inicio': navigate('/inicio'); break;
      case 'comunidad': navigate('/comunidad'); break;
      case 'shorts': navigate('/shorts'); break;
      case 'eventos': navigate('/eventos'); break;
      case 'configuracion': navigate('/configuracion'); break;
    }
  };

  return (
    <div className="min-h-screen w-full flex bg-slate-100">
      <Sidebar onNavigate={handleNavigate} />

      <div className="flex-1 flex flex-col min-w-0">
        <Topbar
          onProfileClick={() => navigate('/perfil')}
          avatarUrl={fotoPerfil ?? Avatar}
        />

        <main className="flex-1 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
}