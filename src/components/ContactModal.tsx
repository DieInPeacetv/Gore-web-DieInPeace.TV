import React from 'react';
import { X, Mail, MessageCircle, Shield, AlertTriangle } from 'lucide-react';

interface ContactModalProps {
  onClose: () => void;
}

const ContactModal: React.FC<ContactModalProps> = ({ onClose }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
      <div className="bg-gray-900 border-2 border-red-600 rounded-lg p-6 w-full max-w-md">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-red-500">Contact & Rules</h2>
          <button onClick={onClose} className="text-red-400 hover:text-red-300">
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-semibold text-red-400 mb-3 flex items-center space-x-2">
              <Mail className="w-5 h-5" />
              <span>Contact Information</span>
            </h3>
            <div className="space-y-2 text-red-300">
              <p>Email: dieinpeace.tv@gmail.com</p>
              <p>Telegram: @pcnnoob_666</p>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-red-400 mb-3 flex items-center space-x-2">
              <Shield className="w-5 h-5" />
              <span>Community Rules</span>
            </h3>
            <div className="space-y-2 text-red-300 text-sm">
              <div className="flex items-start space-x-2">
                <AlertTriangle className="w-4 h-4 text-yellow-500 mt-0.5 flex-shrink-0" />
                <p>No illegal content or activities</p>
              </div>
              <div className="flex items-start space-x-2">
                <AlertTriangle className="w-4 h-4 text-yellow-500 mt-0.5 flex-shrink-0" />
                <p>Respect all community members</p>
              </div>
              <div className="flex items-start space-x-2">
                <AlertTriangle className="w-4 h-4 text-yellow-500 mt-0.5 flex-shrink-0" />
                <p>No spam, harassment, or trolling</p>
              </div>
              <div className="flex items-start space-x-2">
                <AlertTriangle className="w-4 h-4 text-yellow-500 mt-0.5 flex-shrink-0" />
                <p>Follow all applicable laws and regulations</p>
              </div>
              <div className="flex items-start space-x-2">
                <AlertTriangle className="w-4 h-4 text-yellow-500 mt-0.5 flex-shrink-0" />
                <p>Content must comply with Terms of Service</p>
              </div>
              <div className="flex items-start space-x-2">
                <AlertTriangle className="w-4 h-4 text-yellow-500 mt-0.5 flex-shrink-0" />
                <p>No doxxing or sharing personal information</p>
              </div>
              <div className="flex items-start space-x-2">
                <AlertTriangle className="w-4 h-4 text-yellow-500 mt-0.5 flex-shrink-0" />
                <p>Report violations to moderators immediately</p>
              </div>
            </div>
          </div>

          <div className="bg-red-900 bg-opacity-50 border border-red-600 rounded-lg p-4">
            <h4 className="text-red-400 font-semibold mb-2">Important Notice</h4>
            <p className="text-red-300 text-sm">
              This platform is for mature audiences only. All content is user-generated and 
              we do not endorse or promote any illegal activities. Users are responsible 
              for their own actions and content.
            </p>
          </div>
        </div>

        <button
          onClick={onClose}
          className="w-full mt-6 bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-lg transition-colors"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default ContactModal;