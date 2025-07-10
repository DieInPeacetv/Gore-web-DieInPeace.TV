import React, { useState, useEffect } from 'react';
import { Play, Eye, Clock, User, Upload, Plus } from 'lucide-react';

interface Video {
  id: number;
  title: string;
  thumbnail: string;
  duration: string;
  views: number;
  uploader: string;
  uploadDate: string;
  category: string;
}

interface VideoGridProps {
  currentUser?: any;
  onUpload?: () => void;
}

const VideoGrid: React.FC<VideoGridProps> = ({ currentUser, onUpload }) => {
  const [videos, setVideos] = useState<Video[]>([]);
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = [
    { id: 'all', name: 'All' },
    { id: 'accidents', name: 'Accidents' },
    { id: 'violence', name: 'Violence' },
    { id: 'medical', name: 'Medical' },
    { id: 'natural', name: 'Natural' },
    { id: 'other', name: 'Other' }
  ];

  useEffect(() => {
    // Load videos from localStorage
    const savedVideos = localStorage.getItem('dieinpeace_videos');
    if (savedVideos) {
      setVideos(JSON.parse(savedVideos));
    }
  }, []);

  const filteredVideos = selectedCategory === 'all' 
    ? videos 
    : videos.filter(video => video.category === selectedCategory);

  return (
    <div>
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-4 sm:mb-6 gap-4">
        <div>
          <h2 className="text-lg sm:text-2xl font-bold text-red-500 mb-2">Latest Videos</h2>
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-3 py-1 rounded-lg text-xs sm:text-sm transition-colors ${
                  selectedCategory === category.id
                    ? 'bg-red-600 text-white'
                    : 'bg-gray-800 text-red-400 hover:bg-gray-700'
                }`}
              >
                {category.name}
              </button>
            ))}
          </div>
        </div>
        
        {currentUser && (
          <button
            onClick={onUpload}
            className="flex items-center space-x-2 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition-colors text-sm sm:text-base"
          >
            <Upload className="w-4 h-4" />
            <span>Upload Video</span>
          </button>
        )}
      </div>

      {filteredVideos.length === 0 ? (
        <div className="text-center py-12">
          <div className="mb-4">
            <Play className="w-16 h-16 text-red-600 mx-auto mb-4 opacity-50" />
            <h3 className="text-xl font-bold text-red-400 mb-2">No Videos Yet</h3>
            <p className="text-red-300 mb-6">
              {currentUser 
                ? "Be the first to upload a video to the community!" 
                : "Login to start uploading videos to the community!"
              }
            </p>
            {currentUser && (
              <button
                onClick={onUpload}
                className="flex items-center space-x-2 bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg transition-colors mx-auto"
              >
                <Plus className="w-5 h-5" />
                <span>Upload First Video</span>
              </button>
            )}
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-6">
          {filteredVideos.map((video) => (
            <div key={video.id} className="bg-gray-900 border border-red-600 rounded-lg overflow-hidden hover:border-red-400 transition-colors cursor-pointer group">
              <div className="relative">
                <img
                  src={video.thumbnail}
                  alt={video.title}
                  className="w-full h-32 sm:h-48 object-cover"
                />
                <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <Play className="w-8 h-8 sm:w-12 sm:h-12 text-white" />
                </div>
                <div className="absolute bottom-2 right-2 bg-black bg-opacity-75 text-white text-xs px-2 py-1 rounded">
                  <div className="flex items-center space-x-1">
                    <Clock className="w-2 h-2 sm:w-3 sm:h-3" />
                    <span>{video.duration}</span>
                  </div>
                </div>
                <div className="absolute top-2 left-2 bg-red-600 text-white text-xs px-2 py-1 rounded">
                  {categories.find(c => c.id === video.category)?.name || 'Other'}
                </div>
              </div>
              <div className="p-2 sm:p-4">
                <h3 className="text-red-400 font-semibold mb-2 line-clamp-2 text-sm sm:text-base">{video.title}</h3>
                <div className="flex items-center justify-between text-xs sm:text-sm text-red-300">
                  <div className="flex items-center space-x-1">
                    <User className="w-2 h-2 sm:w-3 sm:h-3" />
                    <span className="truncate">{video.uploader}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Eye className="w-2 h-2 sm:w-3 sm:h-3" />
                    <span>{video.views.toLocaleString()}</span>
                  </div>
                </div>
                <p className="text-gray-500 text-xs mt-1 hidden sm:block">{video.uploadDate}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default VideoGrid;