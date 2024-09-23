// pages/chat.tsx
import React from 'react';
import ChatBot from '@/components/chatbot/ChatBot';
import ChatBotSidebar from '@/components/chatbot/ChatBotSidebar';
import { SidebarLayout } from '@/components/common';

const ChatPage = () => {
    return (
        <SidebarLayout>
            <div className="flex h-screen w-full">
                {/* Sidebar */}
                <div className="w-80 border-r border-gray-300">
                    <ChatBotSidebar />
                </div>
                
                {/* Main Chat Area */}
                <div className="flex-grow">
                    <ChatBot />
                </div>
            </div>
        </SidebarLayout>
    );
};

export default ChatPage;