// ChatBotEmptyState.tsx

"use client";
import React, { useState } from 'react';
import { StudioType } from '@/types/studios';
import { ProjectType } from '@/types/projects';
import ChatBotInput from './ChatBotInput';
import { useSendAliQueryMutation } from '@/redux/features/ali/aliApiSlice';
import { AliResultType } from '@/types/ali';
import { toast } from 'react-toastify';

interface ChatBotEmptyStateProps {
  project: ProjectType;
  onConversationStart: (conversationId: number, queryId: number, newAliResult: AliResultType) => void;
}

const ChatBotEmptyState: React.FC<ChatBotEmptyStateProps> = ({ project, onConversationStart }) => {
  const [selectedStudios, setSelectedStudios] = useState<StudioType[]>([]);
  const [sendAliQuery] = useSendAliQueryMutation();

  const handleStudioSelect = (studio: StudioType) => {
    setSelectedStudios((prev) =>
      prev.some((s) => s.id === studio.id) ? prev.filter((s) => s.id !== studio.id) : [...prev, studio]
    );
  };

  const handleStartConversation = async (initialMessage: string) => {
    if (selectedStudios.length === 0) {
      toast.error('Please select at least one studio.');
      return;
    }

    try {
      const studioIds = selectedStudios.map((s) => s.id);

      const result: AliResultType = await sendAliQuery({
        textGenerate: initialMessage,
        studioIds,
        conversationId: null,
      }).unwrap();

      const conversationId = result.conversation;
      const queryId = result.id;

      if (conversationId && queryId) {
        onConversationStart(conversationId, queryId, result);
      } else {
        toast.error('Failed to create conversation.');
      }
    } catch (error) {
      toast.error('Failed to send query.');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-full px-4">
      <h2 className="text-xl font-semibold mb-4">Start a New Conversation</h2>
      <div className="mb-4 flex flex-wrap justify-center">
        {project?.studios.map((studio) => (
          <button
            key={studio.id}
            className={`px-3 py-1 border rounded-full mr-2 mb-2 ${
              selectedStudios.some((s) => s.id === studio.id)
                ? 'bg-blue-500 text-white'
                : 'bg-gray-200'
            }`}
            onClick={() => handleStudioSelect(studio)}
          >
            {studio.name}
          </button>
        ))}
      </div>
      <ChatBotInput onSendMessage={handleStartConversation} />
    </div>
  );
};

export default ChatBotEmptyState;