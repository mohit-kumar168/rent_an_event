import React from 'react';
import { NavLink } from 'react-router-dom';
import logo from '../assets/Elvent.png';

const Nav = () => {
  return (
    <nav className="bg-gray-800 text-white py-3">
      <div className="container mx-auto px-4 flex items-center">
        {/* Logo */}
        <img src={logo} alt="Elvent Logo" className="h-10 w-auto" />

        {/* Navigation Links */}
        <ul className="flex space-x-8 flex-1 justify-center">
          <li>
            <NavLink
              to="/"
              className={({ isActive }) =>
                isActive ? 'text-yellow-400 font-semibold' : 'hover:text-gray-300'
              }
            >
              Home
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/about"
              className={({ isActive }) =>
                isActive ? 'text-yellow-400 font-semibold' : 'hover:text-gray-300'
              }
            >
              About Us
            </NavLink>
          </li>
          <li>
            <NavLink 
              to="/houses" 
              className={({ isActive }) =>
                isActive ? 'text-yellow-400 font-semibold' : 'hover:text-gray-300'
            }
              >
              Houses
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/contact"
              className={({ isActive }) =>
                isActive ? 'text-yellow-400 font-semibold' : 'hover:text-gray-300'
              }
            >
              Contact Us
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/login"
              className={({ isActive }) =>
                isActive ? 'text-yellow-400 font-semibold' : 'hover:text-gray-300'
              }
            >
              Log In
            </NavLink>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Nav;
