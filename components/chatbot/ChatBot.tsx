"use client";

import React, { useState } from 'react';
import ChatBotInput from './ChatBotInput';
import ChatBotResult from './ChatBotResult';
import ChatBotSidebar from './ChatBotSidebar';
import {
  useFetchProjectConversationsQuery,
  useFetchConversationResultsQuery,
  useUpdateConversationMutation, // Import mutation
} from '@/redux/features/ali/aliApiSlice';
import { useSelector } from 'react-redux';
import { selectSelectedProject } from '@/redux/features/projects/projectSelectors';
import { toast } from 'react-toastify';

const ChatBot = () => {
  const [selectedConversation, setSelectedConversation] = useState(null); // Store selected conversation
  const selectedProject = useSelector(selectSelectedProject); // Fetch the selected project from Redux

  // Fetch conversations for the selected project
  const { data: conversations = [], error: convError, isLoading: convLoading, refetch } = useFetchProjectConversationsQuery(selectedProject?.id, {
    skip: !selectedProject, // Skip the query if no project is selected
  });

  // Fetch the results for the selected conversation
  const { data: results = [], error: resultsError, isLoading: resultsLoading } = useFetchConversationResultsQuery(selectedConversation, {
    skip: !selectedConversation, // Skip the query if no conversation is selected
  });

  const [updateConversation] = useUpdateConversationMutation(); // Mutation to update the conversation

  // Handle conversation click in the sidebar
  const handleConversationClick = (conversationId: string) => {
    setSelectedConversation(conversationId); // Set the selected conversation
  };

  // Handle toggle saved status
  const handleToggleSaved = async (conversation) => {
    try {
      const result = await updateConversation({
        conversationId: conversation.id,
        data: { saved: !conversation.saved }, // Toggle the saved field
      });

      // Check if the result has an error property
      if (result.error) {
        throw new Error(result.error.data?.message || 'Failed to update saved status');
      }

      toast.success('Saved status updated successfully.');

      // Refetch conversations after update
      refetch(); // Re-query the conversations to get the updated saved status
    } catch (err) {
      console.error('Failed to toggle saved status:', err.message);
      toast.error(err.message || 'Failed to update saved status.');
    }
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
          handleToggleSaved={handleToggleSaved}
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