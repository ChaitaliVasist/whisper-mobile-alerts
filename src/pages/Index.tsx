
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
      lastMessage: 'Hey! How are you doing today? I was thinking we could grab lunch later.',
      timestamp: '10:30 AM',
      unreadCount: 2,
      avatar: '👨‍💼',
      isOnline: true
    },
    {
      id: '2',
      name: 'Sarah Wilson',
      lastMessage: 'The quarterly meeting is scheduled for 3 PM tomorrow. Please bring your reports.',
      timestamp: '9:45 AM',
      unreadCount: 0,
      avatar: '👩‍💻',
      isOnline: false
    },
    {
      id: '3',
      name: 'Team Group',
      lastMessage: 'Great work everyone on the project! 🎉 Let\'s celebrate this weekend!',
      timestamp: 'Yesterday',
      unreadCount: 5,
      avatar: '👥',
      isOnline: true
    },
    {
      id: '4',
      name: 'Mom',
      lastMessage: 'Don\'t forget to call your grandmother. She misses you.',
      timestamp: '8:20 AM',
      unreadCount: 1,
      avatar: '👩‍🦳',
      isOnline: false
    },
    {
      id: '5',
      name: 'Alex Chen',
      lastMessage: 'Just finished the workout! Want to join me for a run tomorrow morning?',
      timestamp: 'Yesterday',
      unreadCount: 0,
      avatar: '🏃‍♂️',
      isOnline: true
    },
    {
      id: '6',
      name: 'Book Club',
      lastMessage: 'Next book selection: "The Seven Husbands of Evelyn Hugo". Meeting next Friday!',
      timestamp: '2 days ago',
      unreadCount: 3,
      avatar: '📚',
      isOnline: false
    },
    {
      id: '7',
      name: 'David Rodriguez',
      lastMessage: 'Can you send me the presentation slides from today\'s client meeting?',
      timestamp: '3 days ago',
      unreadCount: 0,
      avatar: '👨‍💻',
      isOnline: false
    },
    {
      id: '8',
      name: 'Emma Thompson',
      lastMessage: 'Looking forward to our coffee date this weekend! ☕',
      timestamp: '4 days ago',
      unreadCount: 2,
      avatar: '👩‍🎨',
      isOnline: true
    }
  ]);

  const [messages, setMessages] = useState<Message[]>([
    // John Doe messages
    {
      id: '1',
      chatId: '1',
      content: 'Hey! How are you doing today? I was thinking we could grab lunch later.',
      timestamp: '10:30 AM',
      sender: 'other',
      type: 'text'
    },
    {
      id: '2',
      chatId: '1',
      content: 'I\'m doing great! That sounds like a plan. Where do you want to go?',
      timestamp: '10:32 AM',
      sender: 'me',
      type: 'text'
    },
    // Sarah Wilson messages
    {
      id: '3',
      chatId: '2',
      content: 'The quarterly meeting is scheduled for 3 PM tomorrow. Please bring your reports.',
      timestamp: '9:45 AM',
      sender: 'other',
      type: 'text'
    },
    {
      id: '4',
      chatId: '2',
      content: 'Got it! I\'ll have everything ready by then.',
      timestamp: '9:50 AM',
      sender: 'me',
      type: 'text'
    },
    // Team Group messages
    {
      id: '5',
      chatId: '3',
      content: 'Great work everyone on the project! 🎉 Let\'s celebrate this weekend!',
      timestamp: 'Yesterday',
      sender: 'other',
      type: 'text'
    },
    // Mom messages
    {
      id: '6',
      chatId: '4',
      content: 'Don\'t forget to call your grandmother. She misses you.',
      timestamp: '8:20 AM',
      sender: 'other',
      type: 'text'
    },
    // Alex Chen messages
    {
      id: '7',
      chatId: '5',
      content: 'Just finished the workout! Want to join me for a run tomorrow morning?',
      timestamp: 'Yesterday',
      sender: 'other',
      type: 'text'
    },
    {
      id: '8',
      chatId: '5',
      content: 'Sounds good! What time works for you?',
      timestamp: 'Yesterday',
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

    // Simulate receiving different responses based on chat
    setTimeout(() => {
      const responses = {
        '1': ['That sounds perfect!', 'How about that new Italian place?', 'Looking forward to it!'],
        '2': ['Perfect, see you there!', 'I\'ll prepare the quarterly analysis.', 'Thanks for the reminder!'],
        '3': ['Absolutely! Count me in! 🎉', 'Great team effort everyone!', 'When and where?'],
        '4': ['I will call her tonight, promise!', 'Thanks for reminding me mom ❤️', 'How is she doing?'],
        '5': ['6 AM at the park?', 'Let\'s do it! I need the exercise.', 'What route are we taking?'],
        '6': ['Can\'t wait to read it!', 'Friday works for me!', 'Who\'s bringing snacks?'],
        '7': ['I\'ll send them right now.', 'Check your email in 5 minutes.', 'Hope the client liked it!'],
        '8': ['Me too! ☕', 'Saturday morning works best.', 'I know the perfect café!']
      };
      
      const chatResponses = responses[selectedChat.id as keyof typeof responses] || ['Thanks for your message!'];
      const randomResponse = chatResponses[Math.floor(Math.random() * chatResponses.length)];
      
      const responseMessage: Message = {
        id: (Date.now() + 1).toString(),
        chatId: selectedChat.id,
        content: randomResponse,
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
                <h2 className="text-2xl font-semibold mb-2">Whispr</h2>
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
