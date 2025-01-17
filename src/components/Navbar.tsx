import React, { useState } from 'react';
import { HeartIcon } from '@heroicons/react/24/outline'; // Importando o ícone de coração

const Navbar = () => {
  const [isFavorited, setIsFavorited] = useState(false); // Estado para controlar o favorito

  return (
    <nav className="w-full bg-white/80 backdrop-blur-sm border-b border-gray-200 h-16 flex items-center px-6 fixed top-0">
      <div className="text-lg font-semibold text-primary flex-1">
        Use por sua própria conta e risco e faça uso responsável!
      </div>
      
      {/* Ícone de coração */}
      <div 
        className="flex items-center cursor-pointer"
        onClick={() => setIsFavorited(!isFavorited)} // Muda o estado ao clicar
      >
        <HeartIcon 
          className={`h-6 w-6 ${isFavorited ? 'text-red-600' : 'text-gray-500'}`} 
        />
        <span className="ml-2">{isFavorited ? 'Favoritado' : 'Favoritar'}</span>
      </div>
    </nav>
  );
};

export default Navbar;
