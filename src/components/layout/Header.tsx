import React, { useState, useEffect } from 'react';
import { Search, Bell, ChevronDown, Menu, LogOut, User, Settings } from 'lucide-react';
import { Button } from '../ui/button';
import { useAuth } from '../../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

interface HeaderProps {
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
  toggleRightSidebar: () => void;
}

const Header = ({ sidebarOpen, setSidebarOpen, toggleRightSidebar }: HeaderProps) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [showUserMenu, setShowUserMenu] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  // Close user menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (showUserMenu && !(event.target as Element).closest('.user-menu-container')) {
        setShowUserMenu(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [showUserMenu]);
  return (
    <header className="relative bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between h-16 z-20">
      {/* Left side - Hamburger Menu and Search */}
      <div className="flex items-center">
                <Button 
          variant="ghost"
          size="icon"
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="mr-4 text-gray-500 hover:bg-gray-100 lg:hidden"
        >
          <Menu className="h-5 w-5" />
        </Button>
      <div className="relative max-w-md w-full">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Search className="h-4 w-4 text-gray-400" />
        </div>
        <input
          type="text"
          placeholder="Rechercher..."
          className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 sm:text-sm"
        />
      </div>
      </div>

      {/* Right side - Actions */}
      <div className="flex items-center space-x-4">
        <Button onClick={toggleRightSidebar} variant="ghost" size="icon" className="text-gray-500 hover:bg-gray-100">
          <ChevronDown className="h-5 w-5" />
        </Button>
        
        <Button variant="ghost" size="icon" className="relative text-gray-500 hover:bg-gray-100">
          <Bell className="h-5 w-5" />
          <span className="absolute top-2 right-2 h-2 w-2 rounded-full bg-red-500"></span>
        </Button>
        
        <div className="relative user-menu-container">
          <div className="flex items-center space-x-2">
            <div className="h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center text-gray-600 text-sm font-medium">
              {user?.name?.charAt(0) || 'U'}
            </div>
            <div className="hidden md:block">
              <div className="flex items-center">
                <span className="text-sm font-medium text-gray-700">{user?.name || 'Utilisateur'}</span>
                <ChevronDown className="ml-1 h-4 w-4 text-gray-500" />
              </div>
              <p className="text-xs text-gray-500 capitalize">{user?.role || 'Utilisateur'}</p>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setShowUserMenu(!showUserMenu)}
              className="text-gray-500 hover:bg-gray-100"
            >
              <ChevronDown className="h-4 w-4" />
            </Button>
          </div>

          {/* User Menu Dropdown */}
          {showUserMenu && (
            <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50 border border-gray-200">
              <div className="px-4 py-2 border-b border-gray-100">
                <p className="text-sm font-medium text-gray-900">{user?.name}</p>
                <p className="text-xs text-gray-500">{user?.email}</p>
              </div>
              <Button
                variant="ghost"
                className="w-full justify-start px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                onClick={() => navigate('/settings')}
              >
                <Settings className="h-4 w-4 mr-2" />
                Paramètres
              </Button>
              <Button
                variant="ghost"
                className="w-full justify-start px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                onClick={handleLogout}
              >
                <LogOut className="h-4 w-4 mr-2" />
                Se déconnecter
              </Button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;