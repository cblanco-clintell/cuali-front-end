// ChatBotContainer.tsx

"use client";
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { selectSelectedProject } from '@/redux/features/projects/projectSelectors';
import ChatBotSidebar from './ChatBotSidebar';
import ChatBotConversation from '@/components/chatbot/ChatBotConversation'
import ChatBotEmptyState from '@/components/chatbot/ChatBotEmptyState';
import { useFetchProjectConversationsQuery } from '@/redux/features/ali/aliApiSlice';
import { AliResultType } from '@/types/ali';

interface ChatBotProps {
  showSidebar?: boolean
}

const ChatBot: React.FC<ChatBotProps> = ({ showSidebar=false }) => {
  const [selectedConversationId, setSelectedConversationId] = useState<number | null>(null);
  const [initialQueryId, setInitialQueryId] = useState<number | null>(null);
  const selectedProject = useSelector(selectSelectedProject);
  const { data: conversations = [], error: convError, isLoading: convLoading, refetch } = useFetchProjectConversationsQuery(selectedProject?.id, { skip: !selectedProject });

  // Handle conversation selection
  const handleConversationSelect = (conversationId: number, queryId?: number) => {
    setSelectedConversationId(conversationId);
    setInitialQueryId(queryId || null);
  };

  const handleNewConversation = () => {
    setSelectedConversationId(null);
    setInitialQueryId(null);
  };

  const handleToggleSaved = () => {
    // refetch();
  };

  return (
    <div className="flex w-full bg-white rounded-lg">
      {/* Sidebar */}
      {showSidebar && (
        <ChatBotSidebar
          selectedConversationId={selectedConversationId}
        handleConversationClick={handleConversationSelect}
        conversations={conversations}
        isLoading={convLoading}
        error={convError}
        handleToggleSaved={handleToggleSaved}
          handleNewConversation={handleNewConversation}
        />
      )}

      {/* Main Content */}
      <div className="flex-1">
        {selectedConversationId ? (
          <ChatBotConversation
            conversationId={selectedConversationId}
            initialQueryId={initialQueryId}
          />
        ) : (
          <ChatBotEmptyState
            project={selectedProject}
            onConversationStart={handleConversationSelect}
          />
        )}
      </div>
    </div>
  );
};

export default ChatBot;