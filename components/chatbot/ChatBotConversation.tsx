"use client";
import React, { useState, useEffect, useRef } from 'react';
import ChatBotInput from './ChatBotInput';
import ChatBotResult from './ChatBotResult';
import { useSendAliQueryMutation, useFetchConversationResultsQuery } from '@/redux/features/ali/aliApiSlice';
import { AliResultType } from '@/types/ali';
import { useSelector } from 'react-redux';
import { selectSelectedProject } from '@/redux/features/projects/projectSelectors';
import { toast } from 'react-toastify';

interface ChatBotConversationProps {
  conversationId: number;
  initialQueryId: number | null;
}

const ChatBotConversation: React.FC<ChatBotConversationProps> = ({ conversationId, initialQueryId }) => {
  const [conversationResults, setConversationResults] = useState<AliResultType[]>([]);
  const [queryId, setQueryId] = useState<number | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const selectedProject = useSelector(selectSelectedProject);

  const { data: initialResults = [], error, isLoading } = useFetchConversationResultsQuery(conversationId);
  const [sendAliQuery] = useSendAliQueryMutation();

  const eventSourcesRef = useRef<{ [key: number]: EventSource }>({});

  useEffect(() => {
    if (initialResults) {
      setConversationResults(initialResults);
    }
  }, [initialResults]);

  useEffect(() => {
    console.log('initialQueryId changed:', initialQueryId);
    if (initialQueryId) {
      setQueryId(initialQueryId);
    }
  }, [initialQueryId]);

  useEffect(() => {
    console.log('queryId changed:', queryId);
    if (queryId) {
      setupEventSource(queryId);
    }

    return () => {
      if (eventSourcesRef.current[queryId]) {
        eventSourcesRef.current[queryId].close();
        delete eventSourcesRef.current[queryId];
      }
    };
  }, [queryId]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [conversationResults]);

  const setupEventSource = (queryId: number) => {
    if (eventSourcesRef.current[queryId]) return;

    const eventSource = new EventSource(`http://localhost:9000/api/front/ali/conversations/query/${queryId}/`);

    eventSource.onmessage = (event) => {
      const message = event.data;
      if (message === '___close___') {
        eventSource.close();
        delete eventSourcesRef.current[queryId];
        toast.success('Query completed.');
      } else {
        setConversationResults((prevResults) => {
          const resultIndex = prevResults.findIndex((result) => result.id === queryId);
          if (resultIndex !== -1) {
            const updatedResult = {
              ...prevResults[resultIndex],
              response: prevResults[resultIndex].response + message,
            };
            const newResults = [...prevResults];
            newResults[resultIndex] = updatedResult;
            return newResults;
          } else {
            const newResult: AliResultType = {
              id: queryId,
              query: '', // Set appropriately
              response: message,
              // ... other fields
            };
            return [...prevResults, newResult];
          }
        });
      }
    };

    eventSource.onerror = () => {
      eventSource.close();
      delete eventSourcesRef.current[queryId];
      toast.error('Connection lost. Please try again.');
    };

    eventSourcesRef.current[queryId] = eventSource;
  };

  const handleSendMessage = async (message: string) => {
    try {
      const studioIds = conversationResults[0]?.studio_ids || [];
      const result: AliResultType = await sendAliQuery({
        textGenerate: message,
        studioIds: studioIds,
        conversationId: conversationId,
      }).unwrap();

      const newResult: AliResultType = { ...result, response: '' };
      setConversationResults((prevResults) => [...prevResults, newResult]);

      setQueryId(result.id);
    } catch (error) {
      toast.error('Failed to send message.');
    }
  };

  return (
    <div className="flex flex-col h-full max-w-[75vw] mx-auto relative bg-white max-h-[87vh]">
      <div ref={scrollRef} className="flex-1 overflow-auto p-4 ">
        <div className="mb-2">
          {selectedProject?.studios
            .filter((studio) => conversationResults[0]?.studio_ids?.includes(studio.id))
            .map((studio) => (
              <span key={studio.id} className="bg-gray-100 text-gray-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded-full">
                {studio.name}
              </span>
            ))}
        </div>
        {isLoading && <p>Loading...</p>}
        {error && <p>Error loading conversation.</p>}
        {conversationResults.map((result) => (
          <ChatBotResult key={result.id} result={result} />
        ))}
      </div>
      <div className="p-4">
        <ChatBotInput onSendMessage={handleSendMessage} />
      </div>
    </div>
  );
};

export default ChatBotConversation;