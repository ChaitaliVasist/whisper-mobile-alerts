
import React, { useState, useEffect } from 'react';
import { ChatList } from '@/components/ChatList';
import { ChatWindow } from '@/components/ChatWindow';
import { Header } from '@/components/Header';
import { useNotifications } from '@/hooks/useNotifications';
import { useMobile } from '@/hooks/useMobile';

export interface Chat {
  id: string;
  name: string;
  lastMessage: string;
  timestamp: string;
  unreadCount: number;
  avatar: string;
  isOnline: boolean;
}

export interface Message {
  id: string;
  chatId: string;
  content: string;
  timestamp: string;
  sender: 'me' | 'other';
  type: 'text' | 'image' | 'voice';
}

const Index = () => {
  const [selectedChat, setSelectedChat] = useState<Chat | null>(null);
  const [chats, setChats] = useState<Chat[]>([
    {
      id: '1',
      name: 'John Doe',
      lastMessage: 'Hey! How are you doing?',
      timestamp: '10:30 AM',
      unreadCount: 2,
      avatar: '👨‍💼',
      isOnline: true
    },
    {
      id: '2',
      name: 'Sarah Wilson',
      lastMessage: 'The meeting is at 3 PM',
      timestamp: '9:45 AM',
      unreadCount: 0,
      avatar: '👩‍💻',
      isOnline: false
    },
    {
      id: '3',
      name: 'Team Group',
      lastMessage: 'Great work everyone! 🎉',
      timestamp: 'Yesterday',
      unreadCount: 5,
      avatar: '👥',
      isOnline: true
    }
  ]);

  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      chatId: '1',
      content: 'Hey! How are you doing?',
      timestamp: '10:30 AM',
      sender: 'other',
      type: 'text'
    },
    {
      id: '2',
      chatId: '1',
      content: 'I\'m doing great! Just working on some projects.',
      timestamp: '10:32 AM',
      sender: 'me',
      type: 'text'
    }
  ]);

  const { initializeNotifications, sendTestNotification } = useNotifications();
  const isMobile = useMobile();

  useEffect(() => {
    initializeNotifications();
  }, []);

  const handleSendMessage = (content: string) => {
    if (!selectedChat) return;

    const newMessage: Message = {
      id: Date.now().toString(),
      chatId: selectedChat.id,
      content,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      sender: 'me',
      type: 'text'
    };

    setMessages(prev => [...prev, newMessage]);

    // Update last message in chat list
    setChats(prev => prev.map(chat => 
      chat.id === selectedChat.id 
        ? { ...chat, lastMessage: content, timestamp: newMessage.timestamp }
        : chat
    ));

    // Simulate receiving a response
    setTimeout(() => {
      const responseMessage: Message = {
        id: (Date.now() + 1).toString(),
        chatId: selectedChat.id,
        content: 'Thanks for your message!',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        sender: 'other',
        type: 'text'
      };
      setMessages(prev => [...prev, responseMessage]);
      
      // Send push notification for demo
      sendTestNotification({
        title: selectedChat.name,
        body: responseMessage.content,
        data: { chatId: selectedChat.id }
      });
    }, 2000);
  };

  const chatMessages = messages.filter(msg => msg.chatId === selectedChat?.id);

  if (isMobile && selectedChat) {
    return (
      <div className="h-screen bg-gray-900 flex flex-col">
        <ChatWindow
          chat={selectedChat}
          messages={chatMessages}
          onSendMessage={handleSendMessage}
          onBack={() => setSelectedChat(null)}
        />
      </div>
    );
  }

  return (
    <div className="h-screen bg-gray-900 flex">
      {/* Chat List Sidebar */}
      <div className={`${isMobile ? 'w-full' : 'w-1/3'} border-r border-gray-700 flex flex-col`}>
        <Header />
        <ChatList
          chats={chats}
          selectedChat={selectedChat}
          onSelectChat={setSelectedChat}
        />
      </div>

      {/* Chat Window */}
      {!isMobile && (
        <div className="flex-1">
          {selectedChat ? (
            <ChatWindow
              chat={selectedChat}
              messages={chatMessages}
              onSendMessage={handleSendMessage}
            />
          ) : (
            <div className="h-full flex items-center justify-center bg-gray-800">
              <div className="text-center text-gray-400">
                <div className="text-6xl mb-4">💬</div>
                <h2 className="text-2xl font-semibold mb-2">WhatsApp Clone</h2>
                <p>Select a chat to start messaging</p>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Index;
