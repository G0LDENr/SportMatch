import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import AppRoutes from './routes/AppRoutes';

function Main() {
    return (
        <Router>
            <AppRoutes />
        </Router>
    );
}

export default Main;
