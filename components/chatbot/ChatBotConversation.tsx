// ChatBotConversation.tsx

"use client";
import React, { useState, useEffect, useRef } from 'react';
import ChatBotInput from './ChatBotInput';
import ChatBotResult from './ChatBotResult';
import {
  useSendAliQueryMutation,
  useFetchConversationResultsQuery,
} from '@/redux/features/ali/aliApiSlice';
import { AliResultType } from '@/types/ali';
import { useSelector } from 'react-redux';
import { selectSelectedProject } from '@/redux/features/projects/projectSelectors';
import { toast } from 'react-toastify';

interface ChatBotConversationProps {
  conversationId: number;
  initialQueryId: number | null;
}

const ChatBotConversation: React.FC<ChatBotConversationProps> = ({
  conversationId,
  initialQueryId,
}) => {
  const [conversationResults, setConversationResults] = useState<AliResultType[]>([]);
  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const selectedProject = useSelector(selectSelectedProject);

  const { data: initialResults = [], error, isLoading } =
    useFetchConversationResultsQuery(conversationId);
  const [sendAliQuery] = useSendAliQueryMutation();

  const eventSourceRef = useRef<EventSource | null>(null);

  useEffect(() => {
    if (initialResults) {
      setConversationResults(initialResults);
    }
  }, [initialResults]);

  useEffect(() => {
    return () => {
      if (eventSourceRef.current) {
        eventSourceRef.current.close();
      }
    };
  }, []);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [conversationResults]);

  const setupEventSource = (queryId: number) => {
    if (eventSourceRef.current) {
      eventSourceRef.current.close();
    }

    const eventSource = new EventSource(
      `http://localhost:9000/api/front/ali/conversations/query/${queryId}/`
    );

    eventSourceRef.current = eventSource;
    setIsGenerating(true);

    let fullResponse = '';

    eventSource.onmessage = (event) => {
      const message = event.data;
      if (message === '___close___') {
        eventSource.close();
        eventSourceRef.current = null;
        setIsGenerating(false);
        toast.success('Query completed.');
      } else {
        fullResponse += message;
        setConversationResults((prevResults) => {
          const updatedResults = [...prevResults];
          const lastResult = updatedResults[updatedResults.length - 1];
          if (lastResult && lastResult.id === queryId) {
            lastResult.response = fullResponse;
          }
          return updatedResults;
        });
      }
    };

    eventSource.onerror = () => {
      eventSource.close();
      eventSourceRef.current = null;
      setIsGenerating(false);
      toast.error('Connection lost. Please try again.');
    };
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

      setupEventSource(result.id);
    } catch (error) {
      toast.error('Failed to send message.');
    }
  };

  const handleStopGenerating = () => {
    if (eventSourceRef.current) {
      eventSourceRef.current.close();
      eventSourceRef.current = null;
      setIsGenerating(false);
      toast.info('Generation stopped.');
    }
  };

  return (
    <div className="flex flex-col h-full max-w-[900px] mx-auto relative bg-white max-h-[87vh]">
      <div ref={scrollRef} className="flex-1 overflow-auto p-4 ">
        {/* Display studios associated with this conversation */}
        <div className="mb-2">
          {selectedProject?.studios
            .filter((studio) => conversationResults[0]?.studio_ids?.includes(studio.id))
            .map((studio) => (
              <span
                key={studio.id}
                className="bg-gray-100 text-gray-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded-full"
              >
                {studio.name}
              </span>
            ))}
        </div>
        {/* Display messages */}
        {isLoading && <p>Loading...</p>}
        {error && <p>Error loading conversation.</p>}
        {conversationResults.map((result, index) => (
          <ChatBotResult 
            key={result.id} 
            result={result} 
            isGenerating={isGenerating && index === conversationResults.length - 1}
          />
        ))}
      </div>
      <div className="p-4">
        <ChatBotInput
          onSendMessage={handleSendMessage}
          isGenerating={isGenerating}
          onStopGenerating={handleStopGenerating}
        />
      </div>
    </div>
  );
};

export default ChatBotConversation;
