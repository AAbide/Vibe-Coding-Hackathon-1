import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Award, User, BarChart2, QrCode } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import Logo from '../ui/Logo';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { isLoggedIn, userType, logout } = useAuth();
  const location = useLocation();

  const toggleMenu = () => setIsOpen(!isOpen);
  
  const isActive = (path: string) => location.pathname === path;
  
  const navLinks = isLoggedIn 
    ? userType === 'business' 
      ? [
          { name: 'Dashboard', path: '/business', icon: <BarChart2 size={18} /> },
          { name: 'Manage Rewards', path: '/rewards', icon: <Award size={18} /> },
        ]
      : [
          { name: 'Profile', path: '/profile', icon: <User size={18} /> },
          { name: 'Check In', path: '/check-in', icon: <QrCode size={18} /> },
          { name: 'Rewards', path: '/rewards', icon: <Award size={18} /> },
        ]
    : [];

  return (
    <nav className="bg-white shadow-sm border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <Link to="/" className="flex-shrink-0 flex items-center">
              <Logo />
              <span className="ml-2 text-xl font-semibold text-gray-900">LocalRewards</span>
            </Link>
          </div>
          
          {/* Desktop Navigation */}
          <div className="hidden sm:flex sm:items-center sm:ml-6 space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`flex items-center px-1 pt-1 border-b-2 text-sm font-medium transition-colors duration-200 ease-in-out ${
                  isActive(link.path)
                    ? 'border-purple-500 text-gray-900'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <span className="mr-1">{link.icon}</span>
                {link.name}
              </Link>
            ))}
            
            {isLoggedIn ? (
              <button
                onClick={logout}
                className="ml-2 px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 transition-colors duration-200"
              >
                Sign Out
              </button>
            ) : (
              <div className="flex space-x-4">
                <Link
                  to="/?login=true"
                  className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 transition-colors duration-200"
                >
                  Log In
                </Link>
                <Link
                  to="/?signup=true"
                  className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 transition-colors duration-200"
                >
                  Sign Up
                </Link>
              </div>
            )}
          </div>
          
          {/* Mobile Navigation Button */}
          <div className="flex items-center sm:hidden">
            <button
              onClick={toggleMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-purple-500"
            >
              <span className="sr-only">Open main menu</span>
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile Navigation Menu */}
      <div className={`sm:hidden ${isOpen ? 'block' : 'hidden'}`}>
        <div className="pt-2 pb-3 space-y-1">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`flex items-center pl-3 pr-4 py-2 border-l-4 text-base font-medium ${
                isActive(link.path)
                  ? 'border-purple-500 text-purple-700 bg-purple-50'
                  : 'border-transparent text-gray-600 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-800'
              }`}
              onClick={toggleMenu}
            >
              <span className="mr-2">{link.icon}</span>
              {link.name}
            </Link>
          ))}
          
          {isLoggedIn ? (
            <button
              onClick={() => {
                logout();
                toggleMenu();
              }}
              className="flex w-full pl-3 pr-4 py-2 border-l-4 border-transparent text-base font-medium text-gray-600 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-800"
            >
              Sign Out
            </button>
          ) : (
            <div className="space-y-1">
              <Link
                to="/?login=true"
                className="flex pl-3 pr-4 py-2 border-l-4 border-transparent text-base font-medium text-gray-600 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-800"
                onClick={toggleMenu}
              >
                Log In
              </Link>
              <Link
                to="/?signup=true"
                className="flex pl-3 pr-4 py-2 border-l-4 border-transparent text-base font-medium text-gray-600 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-800"
                onClick={toggleMenu}
              >
                Sign Up
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;