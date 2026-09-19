import React from 'react';
import { motion } from 'framer-motion';
import ConstructionIcon from '../img/LogotipoPrincipal.png';
import '../css/Inicio/inicio.css';

const Inicio = () => {
  return (
    <div className="inicio-container">
      <motion.img
        src={ConstructionIcon}
        alt="En construcción"
        className="icono"
        animate={{
          y: [0, -20, 0],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />

      <h1 className="titulo">Próximamente</h1>
      <p className="subtitulo">En construcción</p>
    </div>
  );
};

export default Inicio;