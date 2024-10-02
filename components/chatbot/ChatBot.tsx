"use client";

import React, { useState, useEffect, useRef } from 'react';
import ChatBotInput from './ChatBotInput';
import ChatBotResult from './ChatBotResult';
import ChatBotSidebar from './ChatBotSidebar';
import { useSendAliQueryMutation, useUpdateConversationMutation, useFetchProjectConversationsQuery, useFetchConversationResultsQuery } from '@/redux/features/ali/aliApiSlice';
import { useSelector } from 'react-redux';
import { selectSelectedProject } from '@/redux/features/projects/projectSelectors';
import { toast } from 'react-toastify';
import { StudioType } from '@/types/studios';
import { AliResultType } from '@/types/ali';

const ChatBot = () => {
  const [selectedConversation, setSelectedConversation] = useState<string | null>(null); // Track selected conversation
  const [conversationResults, setConversationResults] = useState<AliResultType[]>([]);  // Initial results from API
  const [queryId, setQueryId] = useState<number | null>(null);  // Track query ID for SSE
  const [sseResults, setSseResults] = useState<AliResultType[]>([]);  // Results updated by SSE

  const selectedProject = useSelector(selectSelectedProject);  // Selected project from Redux store
  const scrollRef = useRef<HTMLDivElement>(null);  // Ref for scrollable chat container
  const [currentConversationStudios, setCurrentConversationStudios] = useState<StudioType[]>([]);  // Track the studios for the current conversation

  const { data: conversations = [], error: convError, isLoading: convLoading, refetch } = useFetchProjectConversationsQuery(selectedProject?.id, { skip: !selectedProject });
  const { data: initialResults = [], error: resultsError, isLoading: resultsLoading } = useFetchConversationResultsQuery(selectedConversation, { skip: !selectedConversation });

  const [sendAliQuery] = useSendAliQueryMutation();
  const [updateConversation] = useUpdateConversationMutation();

  // SSE (Server-Sent Events) logic: updates conversation results in real-time
  useEffect(() => {
    if (!selectedConversation || !currentConversationStudios) return;  // Guard clause

    if (!queryId) return;  // Return early if no query ID
    const sseUrl = `http://localhost:9000/api/front/ali/conversations/query/${queryId}/`;  // SSE URL
    const eventSource = new EventSource(sseUrl);

    eventSource.onmessage = (event) => {
      const message = event.data;
      if (message === '___close___') {
        toast.success('Query completed.');
        eventSource.close();
      } else {
        setSseResults((prevResults) => {
          const lastResult = prevResults[prevResults.length - 1];
          if (lastResult && !lastResult.response.endsWith(message)) {
            const updatedResults = [...prevResults];
            updatedResults[updatedResults.length - 1].response += message;
            return updatedResults;
          }
          return prevResults;
        });
      }
    };

    eventSource.onerror = () => {
      eventSource.close();  // Close SSE on error
    };

    return () => {
      eventSource.close();  // Clean up SSE connection
    };
  }, [queryId]);

  // Scroll to the bottom when conversation results update
  useEffect(() => {
    if (!selectedConversation || !currentConversationStudios) return;  // Guard clause

    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [conversationResults, sseResults]);

  // Handle sending new query
  const handleSendAliQuery = async (textGenerate: string) => {
    if (!selectedConversation || !currentConversationStudios) return;  // Guard clause

    const studioIds = currentConversationStudios.map((studio) => studio.id);
    try {
      const result: AliResultType = await sendAliQuery({ textGenerate, studioIds, conversationId: selectedConversation });
      const newQuery: AliResultType = { ...result.data, response: '' };
      setSseResults((prevResults) => [...prevResults, newQuery]);
      setQueryId(result.data.id);
      toast.success('Query sent successfully.');
    } catch (err) {
      toast.error('Failed to send query.');
    }
  };

  // Only fetch conversation studios when a conversation is selected
  useEffect(() => {
    if (!selectedConversation || !selectedProject || initialResults.length === 0) return;  // Guard clause

    const studioIds = initialResults[0]?.studio_ids ?? [];
    const filteredStudios = selectedProject.studios.filter((studio) => studioIds.includes(studio.id));
    setCurrentConversationStudios(filteredStudios);
  }, [selectedConversation, selectedProject, initialResults]);

  // Update local state when initialResults are fetched
  useEffect(() => {
    if (!selectedConversation || !currentConversationStudios) return;  // Guard clause

    if (!initialResults) return;  // Guard clause
    setConversationResults(initialResults);
  }, [initialResults]);

  // Handle conversation click in the sidebar
  const handleConversationClick = (conversationId: string) => {
    setSelectedConversation(conversationId);
    setSseResults([]);  // Clear SSE results when switching conversations
  };

  // Combine the initial and real-time conversation results
  const concatenatedResults = [...conversationResults, ...sseResults];

  return (
    <div className="flex w-full bg-white">
      {/* Sidebar for displaying conversations */}
      <div className="w-80 border-r border-gray-300">
        <ChatBotSidebar
          conversations={conversations}
          handleConversationClick={handleConversationClick}
          isLoading={convLoading}
          error={convError}
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
              {concatenatedResults.length === 0 && !resultsLoading && !resultsError && <p>No messages found for this conversation.</p>}
              {concatenatedResults.map((result: AliResultType) => (
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