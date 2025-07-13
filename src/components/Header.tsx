import React from 'react';
import { LogOut, User } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

const Header: React.FC = () => {
  const { user, logout } = useAuth();

  return (
    <header className="bg-[#84aaac] shadow-md border-b border-[#6b8d8e]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row justify-between items-center py-4 gap-4">
          {/* Logo and Title */}
          <div className="flex items-center space-x-3">
            <div className="w-14 sm:w-16 h-14 sm:h-16 rounded-xl overflow-hidden shadow-md bg-white">
              <img
                src="logo.png"
                alt="Barzah Logo"
                className="w-full h-full object-contain"
              />
            </div>
            <div className="text-center sm:text-left">
              <h1 className="text-xl sm:text-2xl font-bold text-white leading-tight">
                Barzah Tasks
              </h1>
              <p className="text-sm sm:text-base text-white/90">
                Internal Task Management
              </p>
            </div>
          </div>

          {/* User Info */}
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              <div className="w-9 h-9 bg-white rounded-full flex items-center justify-center shadow-sm">
                <User className="w-5 h-5 text-[#333]" />
              </div>
              <div className="hidden sm:block text-white">
                <p className="text-sm font-medium truncate max-w-[160px]">Welcome {user?.name}</p>
                <p className="text-xs truncate max-w-[160px]">{user?.email}</p>
              </div>
            </div>

            <button
              onClick={logout}
              className="text-white hover:text-gray-200 transition p-2 hover:bg-white/20 rounded-lg"
              title="Logout"
            >
              <LogOut className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
