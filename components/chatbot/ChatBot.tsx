"use client";

import React, { useState, useEffect, useRef } from 'react';
import ChatBotInput from './ChatBotInput';
import ChatBotResult from './ChatBotResult';
import ChatBotSidebar from './ChatBotSidebar';
import {
  useFetchProjectConversationsQuery,
  useFetchConversationResultsQuery,
  useUpdateConversationMutation,
  useSendAliQueryMutation,
} from '@/redux/features/ali/aliApiSlice';
import { useSelector } from 'react-redux';
import { selectSelectedProject } from '@/redux/features/projects/projectSelectors';
import { toast } from 'react-toastify';
import { AliConversationType, AliResultType } from '@/types/ali';
import { StudioType } from '@/types/studios';

const ChatBot = () => {
  const [selectedConversation, setSelectedConversation] = useState<string | null>(null);
  const [conversationResults, setConversationResults] = useState<AliResultType[]>([]);
  const [queryId, setQueryId] = useState<number | null>(null); // Track the query ID for SSE
  const selectedProject = useSelector(selectSelectedProject);
  const scrollRef = useRef<HTMLDivElement>(null); // Ref to track the scrollable chat container

  const [sendAliQuery] = useSendAliQueryMutation();
  const [updateConversation] = useUpdateConversationMutation(); // Mutation to update the conversation
  const [currentConversationStudios, setCurrentConversationStudios] = useState<StudioType[]>([]);

  // Function to handle the message from SSE
  const handleSSEMessage = (newMessage: string) => {
    setConversationResults((prevResults) => {
      const lastResultIndex = prevResults.length - 1;
      if (lastResultIndex >= 0) {
        const updatedResults = [...prevResults];

        // Check if the message is already part of the response to avoid duplication
        const lastResponse = updatedResults[lastResultIndex].response;
        if (!lastResponse.endsWith(newMessage)) {
          updatedResults[lastResultIndex].response += newMessage;
        }

        return updatedResults;
      }
      return prevResults;
    });
  };

  // Function to handle query completion
  const handleSSEComplete = () => {
    toast.success('Query completed.');
  };

  // Use SSE for the current query ID
  useEffect(() => {
    if (queryId) {
      const sseUrl = `http://localhost:9000/api/front/ali/conversations/query/${queryId}/`; // SSE URL for the conversation
      const eventSource = new EventSource(sseUrl);

      // Listen for messages from the server
      eventSource.onmessage = (event) => {
        const message = event.data;
        console.log('Received SSE chunk:', message); // Log each chunk

        if (message === '___close___') {
          handleSSEComplete(); // Close event
          eventSource.close(); // Close the connection when finished
        } else {
          handleSSEMessage(message); // Handle the incoming message
        }
      };

      // Handle connection error
      eventSource.onerror = (err) => {
        console.error('SSE error:', err);
        eventSource.close(); // Close the connection on error
      };

      return () => {
        eventSource.close(); // Clean up the event source when the component unmounts
      };
    }
  }, [queryId]); // Only run when queryId changes

  // Scroll to the bottom whenever conversationResults is updated
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [conversationResults]);

  // Fetch conversations for the selected project
  const { data: conversations = [], error: convError, isLoading: convLoading, refetch } = useFetchProjectConversationsQuery(selectedProject?.id, {
    skip: !selectedProject,
  });

  // Fetch the results for the selected conversation
  const { data: results = [], error: resultsError, isLoading: resultsLoading } = useFetchConversationResultsQuery(selectedConversation, {
    skip: !selectedConversation,
  });

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

  const handleSendAliQuery = async (textGenerate: string) => {
    const studioIds = currentConversationStudios.map((studio) => studio.id);
    const conversationId = selectedConversation;

    try {
      const result: AliResultType = await sendAliQuery({ textGenerate, studioIds, conversationId });

      // Add the new query with an empty response to the local state
      const newQuery: AliResultType = {
        ...result.data,
        response: '', // Start with an empty response, SSE will update this
      };

      // Add to the results list locally
      setConversationResults((prevResults) => [...prevResults, newQuery]);

      // Set the query ID for SSE to start listening for real-time updates
      setQueryId(result.data.id);

      toast.success('Query sent successfully.');
    } catch (err) {
      toast.error('Failed to send query.');
      console.log(err);
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

  // Update local state when results are fetched from the server
  useEffect(() => {
    if (results) {
      setConversationResults(results); // Initialize results from API call
    }
  }, [results]);

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
          <div ref={scrollRef} className="overflow-auto mx-auto h-[72vh]">
            <div className="px-[7vw]">
              {currentConversationStudios.map((studio) => (
                <span key={studio.id} className="bg-gray-100 text-gray-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded-full">
                  {studio.name}
                </span>
              ))}
              {resultsLoading && <p>Loading...</p>}
              {resultsError && <p>Error loading conversation results.</p>}
              {conversationResults.length === 0 && !resultsLoading && !resultsError && <p>No messages found for this conversation.</p>}

              {/* Render the conversation results */}
              {conversationResults.map((result: AliResultType) => (
                <ChatBotResult key={result.id} result={result} />
              ))}
            </div>
          </div>
          <div className="px-[7vw] mt-3">
            <ChatBotInput handleSendAliQuery={handleSendAliQuery} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatBot;