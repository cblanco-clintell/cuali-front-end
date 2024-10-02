"use client";

import React, { useState, useEffect } from 'react';
import ChatBotInput from './ChatBotInput';
import ChatBotResult from './ChatBotResult';
import ChatBotSidebar from './ChatBotSidebar';
import {
  useFetchProjectConversationsQuery,
  useFetchConversationResultsQuery,
  useUpdateConversationMutation,
} from '@/redux/features/ali/aliApiSlice';
import { useSelector } from 'react-redux';
import { selectSelectedProject } from '@/redux/features/projects/projectSelectors';
import { toast } from 'react-toastify';
import { AliConversationType, AliResultType } from '@/types/ali';
import { StudioType } from '@/types/studios';

const ChatBot = () => {
  const [selectedConversation, setSelectedConversation] = useState<string | null>(null);
  const [currentConversationStudios, setCurrentConversationStudios] = useState<StudioType[]>([]);
  const selectedProject = useSelector(selectSelectedProject);

  // Fetch conversations for the selected project
  const { data: conversations = [], error: convError, isLoading: convLoading, refetch } = useFetchProjectConversationsQuery(selectedProject?.id, {
    skip: !selectedProject,
  });

  // Fetch the results for the selected conversation
  const { data: results = [], error: resultsError, isLoading: resultsLoading } = useFetchConversationResultsQuery(selectedConversation, {
    skip: !selectedConversation,
  });

  const [updateConversation] = useUpdateConversationMutation(); // Mutation to update the conversation

  // Handle conversation click in the sidebar
  const handleConversationClick = (conversationId: string) => {
    setSelectedConversation(conversationId); // Set the selected conversation
  };

  // Handle toggle saved status
  const handleToggleSaved = async (conversation: AliConversationType) => {
    try {
      const result = await updateConversation({
        conversationId: conversation.id,
        data: { saved: !conversation.saved },
      });
      toast.success('Saved status updated successfully.');
      refetch(); // Re-query the conversations to get the updated saved status
    } catch (err) {
      toast.error('Failed to update saved status.');
    }
  };

  // Fetch the studios for the selected conversation only when it changes
  useEffect(() => {
    if (selectedProject && results.length > 0 && results[0].studio_ids) {
      const filteredStudios = selectedProject.studios.filter((studio) => 
        results[0].studio_ids.includes(studio.id)
      );
      setCurrentConversationStudios(filteredStudios);
    } else {
      setCurrentConversationStudios([]);
    }
  }, [selectedProject, results]);

  return (
    <div className="flex w-full bg-white">
      {/* Sidebar for displaying conversations */}
      <div className="w-80 border-r border-gray-300">
        <ChatBotSidebar
          conversations={conversations}
          handleConversationClick={(conversationId: number) => handleConversationClick(conversationId.toString())}
          isLoading={convLoading}
          error={convError}
          selectedConversationId={selectedConversation ? parseInt(selectedConversation) : null}
          handleToggleSaved={handleToggleSaved}
        />
      </div>

      {/* Main Chat Area */}
      <div className="max-w-[75vw] mx-auto relative bg-white">
        <div className="pt-10">
          {/* Chat content */}
          <div className="overflow-auto mx-auto h-[72vh]">
            <div className='px-[7vw]'>
              {currentConversationStudios.map((studio) => (
                <span key={studio.id} className="bg-gray-100 text-gray-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded-full">
                  {studio.name}
                </span>
              ))}
              {resultsLoading && <p>Loading...</p>}
              {resultsError && <p>Error loading conversation results.</p>}
              {results.length === 0 && !resultsLoading && !resultsError && <p>No messages found for this conversation.</p>}

              {/* Render the conversation results */}
              {results.map((result: AliResultType) => (
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