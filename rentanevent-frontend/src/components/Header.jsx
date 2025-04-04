import React from 'react';
import logo from '../assets/Elvent.png';

const Header = () => {
  return (
    <header className="bg-blue-600 text-white h-20 flex items-center shadow-md">
      <div className="container mx-auto px-4 flex items-center">
        <img src={logo} alt="Logo" className="h-14 w-auto object-contain" />
      </div>
    </header>
  );
};

export default Header;
