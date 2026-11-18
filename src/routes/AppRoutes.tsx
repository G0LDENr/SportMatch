import { Routes, Route, Navigate } from 'react-router-dom';

import Login from '../pages/auth/Login';
import Register from '../pages/auth/Registro';
import Inicio from '../pages/home/Home';
import Comunidad from '../pages/comunidad/Comunidad';
import Shorts from '../pages/sportshorts/SportShorts';
import Eventos from '../pages/eventos/Eventos';
import Configuracion from '../pages/configurations/configuracion';
import Perfil from '../pages/perfil/Perfil';
import AppLayout from '../components/layout/AppLayout';

function AppRoutes() {
  return (
    <Routes>
      {/* Auth */}
      <Route path="/login" element={<Login />} />
      <Route path="/registro" element={<Register />} />

      {/* App (con layout compartido) */}
      <Route element={<AppLayout />}>
        <Route path="/" element={<Navigate to="/inicio" replace />} />
        <Route path="/inicio" element={<Inicio />} />
        <Route path="/comunidad" element={<Comunidad />} />
        <Route path="/shorts" element={<Shorts />} />
        <Route path="/eventos" element={<Eventos />} />
        <Route path="/configuracion" element={<Configuracion />} />
        <Route path="/perfil" element={<Perfil />} />
      </Route>
    </Routes>
  );
}

export default AppRoutes;