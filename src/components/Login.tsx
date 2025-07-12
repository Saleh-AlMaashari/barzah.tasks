import React, { useState } from 'react';
import { LogIn, Eye, EyeOff } from 'lucide-react';
import { apiService } from '../services/api';
import { useAuth } from '../contexts/AuthContext';

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const { login } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const response = await apiService.login(email, password);
      login(response.token, response.user);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Login failed');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* Background */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url('/barzah.tasks/Barzah Main Theme 3.png')`,
          filter: 'brightness(0.3)'
        }}
      />
      
      {/* Overlay with unified theme color */}
      <div className="absolute inset-0 bg-[#84aaac]/80" />

      {/* Login Form */}
      <div className="relative z-10 w-full max-w-md p-8">
        <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-2xl p-8 border border-white/20">
          {/* Logo and Header */}
          <div className="text-center mb-8">
            <div className="flex justify-center mb-4">
              <div className="w-20 h-20">
                <img
                  src="/barzah.tasks/logo.png"
                  alt="Barzah Logo"
                  className="w-full h-full object-contain mx-auto"
                />
              </div>
            </div>
            <h1 className="text-2xl font-bold text-[#84aaac] mb-2">Barzah Tasks</h1>
            <p className="text-[#84aaac]">Internal Task Management System</p>
          </div>

          {/* Error Message */}
          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-red-600 text-sm">{error}</p>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-[#84aaac] mb-2">
                Email Address
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-4 py-3 border border-[#84aaac] text-[#84aaac] rounded-lg focus:ring-2 focus:ring-[#84aaac] focus:border-transparent bg-white/80 placeholder-[#84aaac]"
                placeholder="Enter your email"
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-[#84aaac] mb-2">
                Password
              </label>
              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full px-4 py-3 pr-12 border border-[#84aaac] text-[#84aaac] rounded-lg focus:ring-2 focus:ring-[#84aaac] focus:border-transparent bg-white/80 placeholder-[#84aaac]"
                  placeholder="Enter your password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-[#84aaac] hover:text-[#6b8d8e] transition-colors"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-[#84aaac] text-white py-3 px-4 rounded-lg font-medium hover:bg-[#6b8d8e] focus:outline-none focus:ring-2 focus:ring-[#84aaac] disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 flex items-center justify-center space-x-2"
            >
              {isLoading ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <>
                  <LogIn className="w-5 h-5" />
                  <span>Sign In</span>
                </>
              )}
            </button>
          </form>

          {/* Footer */}
          <div className="mt-8 text-center">
            <p className="text-xs text-[#84aaac]">© 2025 Barzah. Internal use only.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
