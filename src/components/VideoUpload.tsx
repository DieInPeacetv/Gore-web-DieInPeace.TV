import React, { useState } from 'react';
import { X, Upload, Video, Image } from 'lucide-react';

interface VideoUploadProps {
  currentUser: any;
  onClose: () => void;
}

const VideoUpload: React.FC<VideoUploadProps> = ({ currentUser, onClose }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('other');
  const [thumbnailUrl, setThumbnailUrl] = useState('');
  const [videoUrl, setVideoUrl] = useState('');
  const [uploading, setUploading] = useState(false);

  const categories = [
    { id: 'accidents', name: 'Accidents' },
    { id: 'violence', name: 'Violence' },
    { id: 'medical', name: 'Medical' },
    { id: 'natural', name: 'Natural Disasters' },
    { id: 'other', name: 'Other' }
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    setUploading(true);

    // Create new video object
    const newVideo = {
      id: Date.now(),
      title: title.trim(),
      thumbnail: thumbnailUrl || 'https://images.pexels.com/photos/1624496/pexels-photo-1624496.jpeg?auto=compress&cs=tinysrgb&w=400',
      duration: '0:00',
      views: 0,
      uploader: currentUser.username,
      uploadDate: 'just now',
      category: category,
      description: description.trim(),
      videoUrl: videoUrl
    };

    // Get existing videos from localStorage
    const existingVideos = JSON.parse(localStorage.getItem('dieinpeace_videos') || '[]');
    
    // Add new video to the beginning of the array
    const updatedVideos = [newVideo, ...existingVideos];
    
    // Save to localStorage (limit to 100 videos to prevent storage issues)
    const limitedVideos = updatedVideos.slice(0, 100);
    localStorage.setItem('dieinpeace_videos', JSON.stringify(limitedVideos));

    // Simulate upload delay
    setTimeout(() => {
      setUploading(false);
      alert('Video uploaded successfully!');
      onClose();
      // Refresh the page to show the new video
      window.location.reload();
    }, 2000);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-2 sm:p-4">
      <div className="bg-gray-900 border-2 border-red-600 rounded-lg p-4 sm:p-6 w-full max-w-md mx-2 max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl sm:text-2xl font-bold text-red-500">Upload Video</h2>
          <button onClick={onClose} className="text-red-400 hover:text-red-300">
            <X className="w-6 h-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-red-400 text-sm font-bold mb-2">
              Title *
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-3 py-2 sm:py-3 bg-gray-800 border border-red-600 rounded-lg text-white focus:outline-none focus:border-red-400 text-sm sm:text-base"
              placeholder="Enter video title..."
              required
              maxLength={100}
            />
            <p className="text-xs text-gray-500 mt-1">{title.length}/100 characters</p>
          </div>

          <div>
            <label className="block text-red-400 text-sm font-bold mb-2">
              Category
            </label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full px-3 py-2 sm:py-3 bg-gray-800 border border-red-600 rounded-lg text-white focus:outline-none focus:border-red-400 text-sm sm:text-base"
            >
              {categories.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-red-400 text-sm font-bold mb-2">
              Description
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full px-3 py-2 sm:py-3 bg-gray-800 border border-red-600 rounded-lg text-white focus:outline-none focus:border-red-400 h-20 resize-none text-sm sm:text-base"
              placeholder="Describe your video..."
              maxLength={500}
            />
            <p className="text-xs text-gray-500 mt-1">{description.length}/500 characters</p>
          </div>

          <div>
            <label className="block text-red-400 text-sm font-bold mb-2">
              Thumbnail URL (optional)
            </label>
            <input
              type="url"
              value={thumbnailUrl}
              onChange={(e) => setThumbnailUrl(e.target.value)}
              className="w-full px-3 py-2 sm:py-3 bg-gray-800 border border-red-600 rounded-lg text-white focus:outline-none focus:border-red-400 text-sm sm:text-base"
              placeholder="https://example.com/thumbnail.jpg"
            />
          </div>

          <div>
            <label className="block text-red-400 text-sm font-bold mb-2">
              Video URL (optional)
            </label>
            <input
              type="url"
              value={videoUrl}
              onChange={(e) => setVideoUrl(e.target.value)}
              className="w-full px-3 py-2 sm:py-3 bg-gray-800 border border-red-600 rounded-lg text-white focus:outline-none focus:border-red-400 text-sm sm:text-base"
              placeholder="https://example.com/video.mp4"
            />
          </div>

          <div className="bg-red-900 bg-opacity-50 border border-red-600 rounded-lg p-3">
            <h4 className="text-red-400 font-semibold mb-2 text-sm">Upload Guidelines</h4>
            <ul className="text-red-300 text-xs space-y-1">
              <li>• No illegal content</li>
              <li>• Must comply with community rules</li>
              <li>• Respect copyright laws</li>
              <li>• No spam or misleading content</li>
            </ul>
          </div>

          <button
            type="submit"
            disabled={uploading || !title.trim()}
            className="w-full bg-red-600 hover:bg-red-700 disabled:bg-gray-600 text-white font-bold py-3 sm:py-4 px-4 rounded-lg transition-colors text-sm sm:text-base flex items-center justify-center space-x-2"
          >
            <Upload className="w-4 h-4" />
            <span>{uploading ? 'Uploading...' : 'Upload Video'}</span>
          </button>
        </form>
      </div>
    </div>
  );
};

export default VideoUpload;