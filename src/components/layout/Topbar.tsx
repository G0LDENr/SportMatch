import React, { FC } from 'react';
import {
  LuSearch,
  LuBell,
  LuShare2,
  LuShoppingCart,
} from 'react-icons/lu';
import Avatar from '../../assets/icons/Avatar.webp';

type TopbarProps = {
  onProfileClick: () => void;
  avatarUrl?: string | null;
};

const Topbar: FC<TopbarProps> = ({ onProfileClick, avatarUrl }) => {
  const foto = avatarUrl || Avatar;

  return (
    <header className="w-full h-14 bg-white border-b border-slate-200 flex items-center justify-between px-4 gap-3">
      <div className="flex-1 max-w-md relative">
        <LuSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-sm" />
        <input
          type="text"
          placeholder="Buscar..."
          className="w-full pl-9 pr-3 py-1.5 bg-slate-100 rounded-md text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
        />
      </div>

      <div className="flex items-center gap-1">
        <button
          type="button"
          className="p-1.5 rounded-md hover:bg-slate-100 text-slate-600 transition relative"
          aria-label="Notificaciones"
        >
          <LuBell className="text-base" />
          <span
            className="absolute top-1 right-1 w-1.5 h-1.5 rounded-full"
            style={{ backgroundColor: '#31d6f9' }}
          />
        </button>

        <button
          type="button"
          className="p-1.5 rounded-md hover:bg-slate-100 text-slate-600 transition"
          aria-label="Compartir"
        >
          <LuShare2 className="text-base" />
        </button>

        <button
          type="button"
          className="p-1.5 rounded-md hover:bg-slate-100 text-slate-600 transition"
          aria-label="Carrito"
        >
          <LuShoppingCart className="text-base" />
        </button>

        <button
          type="button"
          onClick={onProfileClick}
          className="ml-1 w-8 h-8 rounded-full overflow-hidden ring-2 ring-slate-200 hover:ring-blue-500 transition shrink-0"
          aria-label="Ir al perfil"
        >
          <img
            src={foto}
            alt="Perfil"
            className="w-full h-full object-cover"
          />
        </button>
      </div>
    </header>
  );
};

export default Topbar;