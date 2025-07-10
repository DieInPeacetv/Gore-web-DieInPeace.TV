import React from 'react';
import { Skull, AlertTriangle } from 'lucide-react';

interface AgeVerificationProps {
  onVerified: () => void;
}

const AgeVerification: React.FC<AgeVerificationProps> = ({ onVerified }) => {
  const handleLeave = () => {
    window.location.href = 'https://google.com';
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-2 sm:p-4">
      <div className="bg-gray-900 border-2 border-red-600 rounded-lg p-4 sm:p-8 max-w-md w-full text-center mx-2">
        <div className="mb-6">
          <Skull className="w-12 h-12 sm:w-16 sm:h-16 text-red-600 mx-auto mb-4" />
          <h1 className="text-2xl sm:text-3xl font-bold text-red-500 mb-2">DieInPeace.tv</h1>
        </div>

        <div className="mb-6">
          <AlertTriangle className="w-8 h-8 sm:w-12 sm:h-12 text-yellow-500 mx-auto mb-4" />
          <h2 className="text-lg sm:text-xl font-bold text-red-400 mb-4">Age Verification Required</h2>
          <p className="text-red-300 mb-4 text-sm sm:text-base">
            This website contains mature content that may not be suitable for all audiences.
          </p>
          <p className="text-red-300 mb-6 text-sm sm:text-base">
            You must be 18 years or older to enter.
          </p>
        </div>

        <div className="space-y-4">
          <h3 className="text-base sm:text-lg font-semibold text-red-400 mb-4">Community Rules</h3>
          <div className="text-left text-red-300 text-sm space-y-2">
            <p>• No illegal content</p>
            <p>• Respect other users</p>
            <p>• No spam or harassment</p>
            <p>• Follow all applicable laws</p>
            <p>• Content must comply with ToS</p>
          </div>
        </div>

        <div className="mt-8 space-y-4">
          <button
            onClick={onVerified}
            className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-3 sm:py-4 px-6 rounded-lg transition-colors text-sm sm:text-base"
          >
            ENTER (18+)
          </button>
          <button
            onClick={handleLeave}
            className="w-full bg-gray-700 hover:bg-gray-600 text-white font-bold py-3 sm:py-4 px-6 rounded-lg transition-colors text-sm sm:text-base"
          >
            LEAVE
          </button>
        </div>

        <div className="mt-6 text-xs sm:text-sm text-red-400">
          <p>Contact: dieinpeace.tv@gmail.com</p>
          <p>Telegram: @pcnnoob_666</p>
        </div>
      </div>
    </div>
  );
};

export default AgeVerification;