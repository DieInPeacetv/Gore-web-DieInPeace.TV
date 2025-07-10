import React, { useState } from 'react';
import { X, User, Coins, Camera } from 'lucide-react';

interface ProfileModalProps {
  user: any;
  onClose: () => void;
  onUpdate: (userData: any) => void;
}

const ProfileModal: React.FC<ProfileModalProps> = ({ user, onClose, onUpdate }) => {
  const [username, setUsername] = useState(user.username);
  const [bio, setBio] = useState(user.bio || '');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const updatedUser = { ...user, username, bio };
    onUpdate(updatedUser);
    onClose();
  };

  const handleAvatarChange = () => {
    const newAvatar = `https://api.dicebear.com/7.x/skulls/svg?seed=${Date.now()}`;
    const updatedUser = { ...user, avatar: newAvatar };
    onUpdate(updatedUser);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
      <div className="bg-gray-900 border-2 border-red-600 rounded-lg p-6 w-full max-w-md">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-red-500">Profile</h2>
          <button onClick={onClose} className="text-red-400 hover:text-red-300">
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="text-center mb-6">
          <div className="relative inline-block">
            <img
              src={user.avatar}
              alt="Avatar"
              className="w-20 h-20 rounded-full border-2 border-red-600"
            />
            <button
              onClick={handleAvatarChange}
              className="absolute bottom-0 right-0 bg-red-600 hover:bg-red-700 text-white p-1 rounded-full"
            >
              <Camera className="w-4 h-4" />
            </button>
          </div>
          <div className="mt-2 flex items-center justify-center space-x-2">
            <Coins className="w-4 h-4 text-yellow-500" />
            <span className="text-yellow-500 font-bold">{user.coins} coins</span>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-red-400 text-sm font-bold mb-2">
              Username
            </label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-3 py-2 bg-gray-800 border border-red-600 rounded-lg text-white focus:outline-none focus:border-red-400"
              required
            />
          </div>

          <div>
            <label className="block text-red-400 text-sm font-bold mb-2">
              Bio
            </label>
            <textarea
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              className="w-full px-3 py-2 bg-gray-800 border border-red-600 rounded-lg text-white focus:outline-none focus:border-red-400 h-20 resize-none"
              placeholder="Tell us about yourself..."
            />
          </div>

          <button
            type="submit"
            className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-lg transition-colors"
          >
            Update Profile
          </button>
        </form>
      </div>
    </div>
  );
};

export default ProfileModal;