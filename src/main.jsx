import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router';
import Inicio from './pages/Inicio';

function Main() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Inicio />} />
                <Route path="/inicio" element={<Inicio />} />
            </Routes>
        </Router>
    );
}

export default Main;