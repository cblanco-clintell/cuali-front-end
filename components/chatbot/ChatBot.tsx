"use client";

import React, { useState } from 'react';
import ChatBotInput from './ChatBotInput';
import ChatBotResult from './ChatBotResult';
import ChatBotSidebar from './ChatBotSidebar';
import {
  useFetchProjectConversationsQuery,
  useFetchConversationResultsQuery,
} from '@/redux/features/ali/aliApiSlice';
import { useSelector } from 'react-redux';
import { selectSelectedProject } from '@/redux/features/projects/projectSelectors';

const ChatBot = () => {
  const [selectedConversation, setSelectedConversation] = useState(null); // Store selected conversation
  const selectedProject = useSelector(selectSelectedProject); // Fetch the selected project from Redux

  // Fetch conversations for the selected project
  const { data: conversations = [], error: convError, isLoading: convLoading } = useFetchProjectConversationsQuery(selectedProject?.id, {
    skip: !selectedProject, // Skip the query if no project is selected
  });

  // Fetch the results for the selected conversation
  const { data: results = [], error: resultsError, isLoading: resultsLoading } = useFetchConversationResultsQuery(selectedConversation, {
    skip: !selectedConversation, // Skip the query if no conversation is selected
  });

  // Handle conversation click in the sidebar
  const handleConversationClick = (conversationId) => {
    setSelectedConversation(conversationId); // Set the selected conversation
  };

  return (
    <div className="flex w-full">
      {/* Sidebar for displaying conversations */}
      <div className="w-80 border-r border-gray-300">
        <ChatBotSidebar
          conversations={conversations}
          handleConversationClick={handleConversationClick}
          isLoading={convLoading}
          error={convError}
          selectedConversationId={selectedConversation}
        />
      </div>

      {/* Main Chat Area */}
      <div className="max-w-[75vw] mx-auto relative">
        <div className="pt-10">
              {/* Chat content */}
              <div className="overflow-auto mx-auto h-[72vh]">
                <div className='px-[7vw]'>
                  {resultsLoading && <p>Loading...</p>}
                  {resultsError && <p>Error loading conversation results.</p>}
                  {results.length === 0 && !resultsLoading && !resultsError && <p>No messages found for this conversation.</p>}

                  {/* Render the conversation results */}
                  {results.map((result) => (
                    <ChatBotResult key={result.id} result={result} />
                  ))}
                </div>
              </div>
              <div className='px-[7vw] mt-3'>
                <ChatBotInput />
              </div>
              
          </div>
      </div>
    </div>
  );
};

export default ChatBot;