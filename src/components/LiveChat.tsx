import React, { useState, useEffect, useRef } from 'react';
import { Send, MessageCircle } from 'lucide-react';

interface LiveChatProps {
  currentUser: any;
}

interface Message {
  id: number;
  username: string;
  message: string;
  timestamp: Date;
  avatar: string;
}

const LiveChat: React.FC<LiveChatProps> = ({ currentUser }) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    // Simulate incoming messages
    const interval = setInterval(() => {
      const randomMessages = [
        'Welcome to the darkness',
        'Anyone else watching this?',
        'This is insane',
        'RIP',
        'Dark content incoming',
        'Stay safe everyone'
      ];
      
      const randomUsernames = ['DarkSoul666', 'ReaperX', 'VoidWalker', 'ShadowHunter', 'DeathWhisper'];
      
      const newMsg: Message = {
        id: Date.now(),
        username: randomUsernames[Math.floor(Math.random() * randomUsernames.length)],
        message: randomMessages[Math.floor(Math.random() * randomMessages.length)],
        timestamp: new Date(),
        avatar: `https://api.dicebear.com/7.x/skulls/svg?seed=${Math.random()}`
      };
      
      setMessages(prev => [...prev.slice(-49), newMsg]);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim() || !currentUser) return;

    const message: Message = {
      id: Date.now(),
      username: currentUser.username,
      message: newMessage,
      timestamp: new Date(),
      avatar: currentUser.avatar
    };

    setMessages(prev => [...prev, message]);
    setNewMessage('');
  };

  return (
    <div className="bg-gray-900 border-2 border-red-600 rounded-lg h-64 sm:h-80 lg:h-96 flex flex-col">
      <div className="p-2 sm:p-4 border-b border-red-600">
        <div className="flex items-center space-x-2">
          <MessageCircle className="w-5 h-5 text-red-500" />
          <h3 className="text-sm sm:text-lg font-bold text-red-500">Live Chat</h3>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-2 sm:p-4 space-y-1 sm:space-y-2">
        {messages.map((msg) => (
          <div key={msg.id} className="flex items-start space-x-1 sm:space-x-2">
            <img
              src={msg.avatar}
              alt={msg.username}
              className="w-4 h-4 sm:w-6 sm:h-6 rounded-full flex-shrink-0"
            />
            <div className="flex-1 min-w-0">
              <div className="flex items-center space-x-1 sm:space-x-2">
                <span className="text-red-400 text-xs sm:text-sm font-semibold truncate">{msg.username}</span>
                <span className="text-gray-500 text-xs hidden sm:inline">
                  {msg.timestamp.toLocaleTimeString()}
                </span>
              </div>
              <p className="text-red-300 text-xs sm:text-sm break-words">{msg.message}</p>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {currentUser ? (
        <form onSubmit={handleSendMessage} className="p-2 sm:p-4 border-t border-red-600">
          <div className="flex space-x-1 sm:space-x-2">
            <input
              type="text"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder="Type a message..."
              className="flex-1 px-2 sm:px-3 py-2 bg-gray-800 border border-red-600 rounded-lg text-white text-xs sm:text-sm focus:outline-none focus:border-red-400"
            />
            <button
              type="submit"
              className="bg-red-600 hover:bg-red-700 text-white p-2 rounded-lg transition-colors flex-shrink-0"
            >
              <Send className="w-3 h-3 sm:w-4 sm:h-4" />
            </button>
          </div>
        </form>
      ) : (
        <div className="p-2 sm:p-4 border-t border-red-600 text-center">
          <p className="text-red-400 text-xs sm:text-sm">Login to chat</p>
        </div>
      )}
    </div>
  );
};

export default LiveChat;