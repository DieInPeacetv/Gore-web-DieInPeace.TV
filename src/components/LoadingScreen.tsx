import React, { useState, useEffect } from 'react';
import { Skull } from 'lucide-react';

const LoadingScreen: React.FC = () => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(timer);
          return 100;
        }
        return prev + 2;
      });
    }, 60);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="min-h-screen bg-black flex items-center justify-center">
      <div className="text-center">
        <div className="mb-8 animate-pulse">
          <Skull className="w-24 h-24 text-red-600 mx-auto mb-4" />
          <h1 className="text-4xl font-bold text-red-500 mb-2">DieInPeace.tv</h1>
          <p className="text-red-400 text-lg">Where Videos Rest in Peace</p>
        </div>
        
        <div className="w-80 bg-gray-900 rounded-full h-4 mb-4">
          <div 
            className="bg-gradient-to-r from-red-600 to-red-800 h-4 rounded-full transition-all duration-300"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
        
        <p className="text-red-400">{progress}% Loading...</p>
        
        <div className="mt-8 text-red-600 text-sm animate-pulse">
          <p>Entering the darkness...</p>
        </div>
      </div>
    </div>
  );
};

export default LoadingScreen;