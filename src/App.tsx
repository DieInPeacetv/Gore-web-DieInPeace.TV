import React, { useState, useEffect } from 'react';
import { Skull, Users, MessageCircle, User, Upload, Dice6, Mail, Shield, Eye, EyeOff, Menu, X } from 'lucide-react';
import LoadingScreen from './components/LoadingScreen';
import AgeVerification from './components/AgeVerification';
import Header from './components/Header';
import LoginModal from './components/LoginModal';
import RegisterModal from './components/RegisterModal';
import ProfileModal from './components/ProfileModal';
import VideoUpload from './components/VideoUpload';
import LiveChat from './components/LiveChat';
import Forum from './components/Forum';
import Casino from './components/Casino';
import ContactModal from './components/ContactModal';
import VideoGrid from './components/VideoGrid';

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [showAgeVerification, setShowAgeVerification] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [showUpload, setShowUpload] = useState(false);
  const [showForum, setShowForum] = useState(false);
  const [showCasino, setShowCasino] = useState(false);
  const [showContact, setShowContact] = useState(false);
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [onlineUsers] = useState(Math.floor(Math.random() * 10) + 40); // 40-50 online users
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  useEffect(() => {
    // Check for saved user in localStorage
    const savedUser = localStorage.getItem('dieinpeace_user');
    if (savedUser) {
      const userData = JSON.parse(savedUser);
      setCurrentUser(userData);
      setIsAuthenticated(true);
    }

    // Simulate loading time
    const timer = setTimeout(() => {
      setIsLoading(false);
      setShowAgeVerification(true);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  const handleAgeVerified = () => {
    setShowAgeVerification(false);
  };

  const handleLogin = (userData: any) => {
    setCurrentUser(userData);
    setIsAuthenticated(true);
    setShowLogin(false);
    localStorage.setItem('dieinpeace_user', JSON.stringify(userData));
  };

  const handleRegister = (userData: any) => {
    setCurrentUser(userData);
    setIsAuthenticated(true);
    setShowRegister(false);
    localStorage.setItem('dieinpeace_user', JSON.stringify(userData));
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem('dieinpeace_user');
  };

  const updateUser = (updatedUser: any) => {
    setCurrentUser(updatedUser);
    localStorage.setItem('dieinpeace_user', JSON.stringify(updatedUser));
  };

  if (isLoading) {
    return <LoadingScreen />;
  }

  if (showAgeVerification) {
    return <AgeVerification onVerified={handleAgeVerified} />;
  }

  return (
    <div className="min-h-screen bg-black text-red-500">
      <Header 
        isAuthenticated={isAuthenticated}
        currentUser={currentUser}
        onlineUsers={onlineUsers}
        onLogin={() => setShowLogin(true)}
        onRegister={() => setShowRegister(true)}
        onProfile={() => setShowProfile(true)}
        onLogout={handleLogout}
        onUpload={() => setShowUpload(true)}
        onForum={() => setShowForum(true)}
        onCasino={() => setShowCasino(true)}
        onContact={() => setShowContact(true)}
        showMobileMenu={showMobileMenu}
        setShowMobileMenu={setShowMobileMenu}
      />

      <main className="container mx-auto px-2 sm:px-4 py-4 sm:py-8">
        {showForum ? (
          <Forum currentUser={currentUser} onBack={() => setShowForum(false)} />
        ) : showCasino ? (
          <Casino currentUser={currentUser} onBack={() => setShowCasino(false)} />
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 lg:gap-8">
            <div className="lg:col-span-3 order-2 lg:order-1">
              <VideoGrid currentUser={currentUser} onUpload={() => setShowUpload(true)} />
            </div>
            <div className="lg:col-span-1 order-1 lg:order-2">
              <LiveChat currentUser={currentUser} />
            </div>
          </div>
        )}
      </main>

      {/* Modals */}
      {showLogin && (
        <LoginModal 
          onClose={() => setShowLogin(false)}
          onLogin={handleLogin}
          onSwitchToRegister={() => {
            setShowLogin(false);
            setShowRegister(true);
          }}
        />
      )}

      {showRegister && (
        <RegisterModal 
          onClose={() => setShowRegister(false)}
          onRegister={handleRegister}
          onSwitchToLogin={() => {
            setShowRegister(false);
            setShowLogin(true);
          }}
        />
      )}

      {showProfile && currentUser && (
        <ProfileModal 
          user={currentUser}
          onClose={() => setShowProfile(false)}
          onUpdate={updateUser}
        />
      )}

      {showUpload && isAuthenticated && (
        <VideoUpload 
          currentUser={currentUser}
          onClose={() => setShowUpload(false)}
        />
      )}

      {showContact && (
        <ContactModal onClose={() => setShowContact(false)} />
      )}
    </div>
  );
}

export default App;