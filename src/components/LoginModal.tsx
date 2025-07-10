import React, { useState } from 'react';
import { X, Eye, EyeOff } from 'lucide-react';

interface LoginModalProps {
  onClose: () => void;
  onLogin: (userData: any) => void;
  onSwitchToRegister: () => void;
}

const LoginModal: React.FC<LoginModalProps> = ({ onClose, onLogin, onSwitchToRegister }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate login
    const userData = {
      id: 1,
      username: email.split('@')[0],
      email,
      coins: 100,
      avatar: `https://api.dicebear.com/7.x/skulls/svg?seed=${email}`
    };
    onLogin(userData);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-2 sm:p-4">
      <div className="bg-gray-900 border-2 border-red-600 rounded-lg p-4 sm:p-6 w-full max-w-md mx-2">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl sm:text-2xl font-bold text-red-500">Login</h2>
          <button onClick={onClose} className="text-red-400 hover:text-red-300">
            <X className="w-6 h-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-red-400 text-sm font-bold mb-2">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 sm:py-3 bg-gray-800 border border-red-600 rounded-lg text-white focus:outline-none focus:border-red-400 text-sm sm:text-base"
              required
            />
          </div>

          <div>
            <label className="block text-red-400 text-sm font-bold mb-2">
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-3 py-2 sm:py-3 bg-gray-800 border border-red-600 rounded-lg text-white focus:outline-none focus:border-red-400 pr-10 text-sm sm:text-base"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-2.5 text-red-400 hover:text-red-300"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-3 sm:py-4 px-4 rounded-lg transition-colors text-sm sm:text-base"
          >
            Login
          </button>
        </form>

        <div className="mt-4 text-center">
          <p className="text-red-400 text-sm sm:text-base">
            Don't have an account?{' '}
            <button
              onClick={onSwitchToRegister}
              className="text-red-300 hover:text-red-200 underline text-sm sm:text-base"
            >
              Register here
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginModal;