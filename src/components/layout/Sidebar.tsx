import React, { FC, useState, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import {
  LuHouse,
  LuUsers,
  LuClapperboard,
  LuCalendar,
  LuSettings,
} from 'react-icons/lu';
import LogotipoGrande from '../../assets/icons/Logo-SportMatch.webp';
import LogotipoPequeno from '../../assets/icons/Isotipo-SportMatch-white.webp';

type SidebarProps = {
  onNavigate?: (id: string) => void;
};

const menuItems = [
  { id: 'inicio', label: 'Inicio', icon: LuHouse, path: '/inicio' },
  { id: 'comunidad', label: 'Comunidad', icon: LuUsers, path: '/comunidad' },
  { id: 'shorts', label: 'Shorts', icon: LuClapperboard, path: '/shorts' },
  { id: 'eventos', label: 'Eventos', icon: LuCalendar, path: '/eventos' },
  { id: 'configuracion', label: 'Configuración', icon: LuSettings, path: '/configuracion' },
];

const Sidebar: FC<SidebarProps> = ({ onNavigate }) => {
  const [hovered, setHovered] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const location = useLocation();
  const collapsed = !hovered;

  const handleEnter = () => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
    setHovered(true);
  };

  const handleLeave = () => {
    timerRef.current = setTimeout(() => {
      setHovered(false);
    }, 200);
  };

  return (
    <aside
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
      className={`${
        collapsed ? 'w-20' : 'w-48'
      } min-h-screen bg-[#090f15] text-white flex flex-col transition-[width] duration-300 ease-in-out`}
    >
      <div className="flex items-center justify-center h-32 border-b border-slate-800 px-3">
        <img
          src={collapsed ? LogotipoPequeno : LogotipoGrande}
          alt="Logo"
          className={`object-contain transition-all duration-300 ${
            collapsed ? 'w-14 h-14' : 'w-full h-24'
          }`}
        />
      </div>

      <nav className="flex-1 flex flex-col gap-2 p-3">
        {menuItems.map(({ id, label, icon: Icon, path }) => {
          // 👇 activo según la URL actual, no por prop
          const active = location.pathname === path;
          return (
            <button
              key={id}
              type="button"
              onClick={() => onNavigate?.(id)}
              className={`flex items-center gap-3 px-3 py-3 rounded-lg transition-colors ${
                active
                  ? 'bg-[#202d3a] text-white border-l-[3px] border-[#03bddb]'
                  : 'text-slate-400 hover:bg-white/5 hover:text-white border-l-[3px] border-transparent'
              } ${collapsed ? 'justify-center' : 'justify-start'}`}
              title={collapsed ? label : undefined}
            >
              <Icon className="text-xl shrink-0" />
              {!collapsed && (
                <span className="text-sm font-medium truncate">{label}</span>
              )}
            </button>
          );
        })}
      </nav>
    </aside>
  );
};

export default Sidebar;