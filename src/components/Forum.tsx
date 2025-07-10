import React, { useState } from 'react';
import { ArrowLeft, MessageSquare, User, Clock, Plus } from 'lucide-react';

interface ForumProps {
  currentUser: any;
  onBack: () => void;
}

interface ForumPost {
  id: number;
  title: string;
  author: string;
  replies: number;
  lastActivity: string;
  content: string;
}

const Forum: React.FC<ForumProps> = ({ currentUser, onBack }) => {
  const [posts] = useState<ForumPost[]>([
    {
      id: 1,
      title: "Welcome to DieInPeace.tv Forum",
      author: "Admin",
      replies: 23,
      lastActivity: "2 hours ago",
      content: "Welcome to our community forum. Please follow the rules and be respectful."
    },
    {
      id: 2,
      title: "New video categories discussion",
      author: "DarkMaster",
      replies: 15,
      lastActivity: "4 hours ago",
      content: "What new categories would you like to see on the platform?"
    },
    {
      id: 3,
      title: "Technical issues and bugs",
      author: "TechSupport",
      replies: 8,
      lastActivity: "1 day ago",
      content: "Report any technical issues or bugs you encounter here."
    },
    {
      id: 4,
      title: "Community guidelines reminder",
      author: "Moderator",
      replies: 31,
      lastActivity: "2 days ago",
      content: "Please remember to follow our community guidelines at all times."
    },
    {
      id: 5,
      title: "Video upload tips and tricks",
      author: "VideoMaster",
      replies: 12,
      lastActivity: "3 days ago",
      content: "Share your best practices for uploading quality content."
    },
    {
      id: 6,
      title: "Site maintenance scheduled",
      author: "Admin",
      replies: 5,
      lastActivity: "4 days ago",
      content: "We will be performing maintenance on the site this weekend."
    },
    {
      id: 7,
      title: "New member introductions",
      author: "WelcomeBot",
      replies: 45,
      lastActivity: "5 days ago",
      content: "New members, please introduce yourselves here!"
    },
    {
      id: 8,
      title: "Feature requests and suggestions",
      author: "DevTeam",
      replies: 28,
      lastActivity: "1 week ago",
      content: "What features would you like to see added to the site?"
    }
  ]);

  return (
    <div className="h-screen flex flex-col">
      <div className="flex items-center justify-between mb-4 sm:mb-6 flex-shrink-0">
        <div className="flex items-center space-x-4">
          <button
            onClick={onBack}
            className="flex items-center space-x-1 sm:space-x-2 text-red-400 hover:text-red-300 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span className="hidden sm:inline">Back</span>
          </button>
          <h2 className="text-lg sm:text-2xl font-bold text-red-500">Forum</h2>
        </div>
        {currentUser && (
          <button className="flex items-center space-x-1 sm:space-x-2 bg-red-600 hover:bg-red-700 text-white px-2 sm:px-4 py-2 rounded-lg transition-colors text-sm sm:text-base">
            <Plus className="w-4 h-4" />
            <span className="hidden sm:inline">New Post</span>
            <span className="sm:hidden">New</span>
          </button>
        )}
      </div>

      <div className="flex-1 overflow-y-auto space-y-3 sm:space-y-4 pr-2">
        {posts.map((post) => (
          <div key={post.id} className="bg-gray-900 border border-red-600 rounded-lg p-3 sm:p-6 hover:border-red-400 transition-colors">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <h3 className="text-sm sm:text-lg font-semibold text-red-400 mb-2">{post.title}</h3>
                <p className="text-red-300 mb-2 sm:mb-4 text-sm sm:text-base">{post.content}</p>
                <div className="flex items-center space-x-2 sm:space-x-4 text-xs sm:text-sm text-red-300">
                  <div className="flex items-center space-x-1">
                    <User className="w-3 h-3 sm:w-4 sm:h-4" />
                    <span className="truncate">{post.author}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <MessageSquare className="w-3 h-3 sm:w-4 sm:h-4" />
                    <span>{post.replies} replies</span>
                  </div>
                  <div className="hidden sm:flex items-center space-x-1">
                    <Clock className="w-3 h-3 sm:w-4 sm:h-4" />
                    <span>{post.lastActivity}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Forum;