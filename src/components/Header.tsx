import React from 'react';
import { Skull, Users, User, Upload, MessageSquare, Dice6, Mail, LogOut, Menu, X } from 'lucide-react';

interface HeaderProps {
  isAuthenticated: boolean;
  currentUser: any;
  onlineUsers: number;
  onLogin: () => void;
  onRegister: () => void;
  onProfile: () => void;
  onLogout: () => void;
  onUpload: () => void;
  onForum: () => void;
  onCasino: () => void;
  onContact: () => void;
  showMobileMenu: boolean;
  setShowMobileMenu: (show: boolean) => void;
}

const Header: React.FC<HeaderProps> = ({
  isAuthenticated,
  currentUser,
  onlineUsers,
  onLogin,
  onRegister,
  onProfile,
  onLogout,
  onUpload,
  onForum,
  onCasino,
  onContact,
  showMobileMenu,
  setShowMobileMenu
}) => {
  return (
    <header className="bg-gray-900 border-b-2 border-red-600 sticky top-0 z-50">
      <div className="container mx-auto px-2 sm:px-4 py-3 sm:py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <Skull className="w-6 h-6 sm:w-8 sm:h-8 text-red-600" />
              <h1 className="text-lg sm:text-2xl font-bold text-red-500">DieInPeace.tv</h1>
            </div>
            <div className="hidden sm:flex items-center space-x-1 text-green-400">
              <Users className="w-4 h-4" />
              <span className="text-sm">{onlineUsers} online</span>
            </div>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setShowMobileMenu(!showMobileMenu)}
            className="md:hidden text-red-400 hover:text-red-300"
          >
            {showMobileMenu ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>

          {/* Desktop navigation */}
          <nav className="hidden md:flex items-center space-x-4">
            <button
              onClick={onForum}
              className="flex items-center space-x-1 text-red-400 hover:text-red-300 transition-colors"
            >
              <MessageSquare className="w-4 h-4" />
              <span>Forum</span>
            </button>
            <button
              onClick={onCasino}
              className="flex items-center space-x-1 text-red-400 hover:text-red-300 transition-colors"
            >
              <Dice6 className="w-4 h-4" />
              <span>Casino</span>
            </button>
            <button
              onClick={onContact}
              className="flex items-center space-x-1 text-red-400 hover:text-red-300 transition-colors"
            >
              <Mail className="w-4 h-4" />
              <span>Contact</span>
            </button>
          </nav>

          {/* Desktop auth buttons */}
          <div className="hidden md:flex items-center space-x-4">
            {isAuthenticated ? (
              <>
                <button
                  onClick={onUpload}
                  className="flex items-center space-x-1 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition-colors"
                >
                  <Upload className="w-4 h-4" />
                  <span>Upload</span>
                </button>
                <button
                  onClick={onProfile}
                  className="flex items-center space-x-1 text-red-400 hover:text-red-300 transition-colors"
                >
                  <User className="w-4 h-4" />
                  <span>{currentUser?.username}</span>
                </button>
                <button
                  onClick={onLogout}
                  className="text-red-400 hover:text-red-300 transition-colors"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={onLogin}
                  className="text-red-400 hover:text-red-300 transition-colors px-4 py-2"
                >
                  Login
                </button>
                <button
                  onClick={onRegister}
                  className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition-colors"
                >
                  Register
                </button>
              </>
            )}
          </div>
        </div>

        {/* Mobile menu */}
        {showMobileMenu && (
          <div className="md:hidden mt-4 pb-4 border-t border-red-600">
            <div className="flex items-center justify-center space-x-1 text-green-400 mb-4">
              <Users className="w-4 h-4" />
              <span className="text-sm">{onlineUsers} online</span>
            </div>
            
            <nav className="flex flex-col space-y-3 mb-4">
              <button
                onClick={() => {
                  onForum();
                  setShowMobileMenu(false);
                }}
                className="flex items-center justify-center space-x-2 text-red-400 hover:text-red-300 transition-colors py-2"
              >
                <MessageSquare className="w-4 h-4" />
                <span>Forum</span>
              </button>
              <button
                onClick={() => {
                  onCasino();
                  setShowMobileMenu(false);
                }}
                className="flex items-center justify-center space-x-2 text-red-400 hover:text-red-300 transition-colors py-2"
              >
                <Dice6 className="w-4 h-4" />
                <span>Casino</span>
              </button>
              <button
                onClick={() => {
                  onContact();
                  setShowMobileMenu(false);
                }}
                className="flex items-center justify-center space-x-2 text-red-400 hover:text-red-300 transition-colors py-2"
              >
                <Mail className="w-4 h-4" />
                <span>Contact</span>
              </button>
            </nav>

            <div className="flex flex-col space-y-3">
              {isAuthenticated ? (
                <>
                  <button
                    onClick={() => {
                      onUpload();
                      setShowMobileMenu(false);
                    }}
                    className="flex items-center justify-center space-x-2 bg-red-600 hover:bg-red-700 text-white px-4 py-3 rounded-lg transition-colors"
                  >
                    <Upload className="w-4 h-4" />
                    <span>Upload</span>
                  </button>
                  <button
                    onClick={() => {
                      onProfile();
                      setShowMobileMenu(false);
                    }}
                    className="flex items-center justify-center space-x-2 text-red-400 hover:text-red-300 transition-colors py-2"
                  >
                    <User className="w-4 h-4" />
                    <span>{currentUser?.username}</span>
                  </button>
                  <button
                    onClick={() => {
                      onLogout();
                      setShowMobileMenu(false);
                    }}
                    className="flex items-center justify-center space-x-2 text-red-400 hover:text-red-300 transition-colors py-2"
                  >
                    <LogOut className="w-4 h-4" />
                    <span>Logout</span>
                  </button>
                </>
              ) : (
                <>
                  <button
                    onClick={() => {
                      onLogin();
                      setShowMobileMenu(false);
                    }}
                    className="text-red-400 hover:text-red-300 transition-colors px-4 py-3 border border-red-600 rounded-lg"
                  >
                    Login
                  </button>
                  <button
                    onClick={() => {
                      onRegister();
                      setShowMobileMenu(false);
                    }}
                    className="bg-red-600 hover:bg-red-700 text-white px-4 py-3 rounded-lg transition-colors"
                  >
                    Register
                  </button>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;