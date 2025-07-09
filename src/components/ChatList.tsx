
import React from 'react';
import { Chat } from '@/pages/Index';

interface ChatListProps {
  chats: Chat[];
  selectedChat: Chat | null;
  onSelectChat: (chat: Chat) => void;
}

export const ChatList: React.FC<ChatListProps> = ({ chats, selectedChat, onSelectChat }) => {
  return (
    <div className="flex-1 overflow-y-auto">
      {chats.map((chat) => (
        <div
          key={chat.id}
          onClick={() => onSelectChat(chat)}
          className={`p-4 border-b border-gray-700 cursor-pointer hover:bg-gray-700 transition-colors ${
            selectedChat?.id === chat.id ? 'bg-gray-700' : ''
          }`}
        >
          <div className="flex items-center gap-3">
            {/* Avatar */}
            <div className="relative">
              <div className="w-12 h-12 bg-gray-600 rounded-full flex items-center justify-center text-xl">
                {chat.avatar}
              </div>
              {chat.isOnline && (
                <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-gray-800"></div>
              )}
            </div>

            {/* Chat Info */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between">
                <h3 className="text-white font-medium truncate">{chat.name}</h3>
                <span className="text-gray-400 text-sm">{chat.timestamp}</span>
              </div>
              <div className="flex items-center justify-between mt-1">
                <p className="text-gray-400 text-sm truncate">{chat.lastMessage}</p>
                {chat.unreadCount > 0 && (
                  <div className="bg-green-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center ml-2">
                    {chat.unreadCount}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
