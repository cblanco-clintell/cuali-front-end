// pages/chat.tsx
import React from 'react';
import ChatBot from '@/components/chatbot/ChatBot';
import ChatBotSidebar from '@/components/chatbot/ChatBotSidebar';
import { SidebarLayout } from '@/components/common';
import Header from '@/components/header/Header';

const ChatPage = () => {
    return (
        <SidebarLayout>
            <Header breadcrumbs={[{ title: 'Ali' }]} />
            <div className="flex w-full">
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