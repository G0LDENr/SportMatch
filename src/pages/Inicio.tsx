import React, { FC } from 'react';
import { motion } from 'framer-motion';
import ConstructionIcon from '../assets/images/Logo-SportMatch.webp';

const Inicio: FC = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-slate-50 to-slate-200 px-4">
      <motion.img
        src={ConstructionIcon}
        alt="En construcción"
        className="w-32 h-32 md:w-48 md:h-48 mb-8 drop-shadow-lg"
        animate={{ y: [0, -20, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
      />

      <h1 className="text-4xl md:text-6xl font-bold text-slate-800 mb-4 text-center">
        Próximamente
      </h1>
      <p className="text-lg md:text-xl text-slate-600 text-center max-w-md">
        En construcción
      </p>
    </div>
  );
};

export default Inicio;