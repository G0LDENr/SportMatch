import {Routes, Route} from 'react-router-dom';

import Login from '../pages/auth/Login';
import Inicio from '../pages/auth/Inicio';

function AppRoutes() {
    return (
        <Routes>
            {/*Rutas Auth*/}
            <Route path="/" element={<Login/>}/>
            <Route path="/inicio" element={<Inicio/>}/>

            {/*Rutas protegidas*/}

            {/*<Route path="/usuario" element={<UserLayout/>}>*/}
            {/*    <Route index element={<Feed/>}/>*/}
            {/*    <Route path="perfil" element={<Perfil/>}/>*/}
            {/*    <Route path="amigos" element={<Amigos/>}/>*/}
            {/*</Route>*/}

            {/* Rutas de organizadores */}


            {/*<Route path="/organizer" element={<OrganizerLayout />}>*/}
            {/*  <Route index element={<Dashboard />} />*/}
            {/*  <Route path="eventos" element={<MisEventos />} />*/}
            {/*  <Route path="participantes" element={<Participantes />} />*/}
            {/*</Route>*/}


        </Routes>
    );
}

export default AppRoutes;
