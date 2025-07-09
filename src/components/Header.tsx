
import React from 'react';
import { Search, MoreVertical, MessageSquare } from 'lucide-react';

export const Header = () => {
  return (
    <div className="bg-gray-800 p-4 border-b border-gray-700">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-white text-xl font-semibold flex items-center gap-2">
          <MessageSquare className="w-6 h-6 text-green-500" />
          WhatsApp
        </h1>
        <div className="flex items-center gap-2">
          <button className="p-2 text-gray-400 hover:text-white hover:bg-gray-700 rounded-full transition-colors">
            <Search className="w-5 h-5" />
          </button>
          <button className="p-2 text-gray-400 hover:text-white hover:bg-gray-700 rounded-full transition-colors">
            <MoreVertical className="w-5 h-5" />
          </button>
        </div>
      </div>
      
      {/* Search Bar */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
        <input
          type="text"
          placeholder="Search or start new chat"
          className="w-full bg-gray-700 text-white pl-10 pr-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
        />
      </div>
    </div>
  );
};
