// ChatBotEmptyState.tsx

"use client";
import React, { useState } from 'react';
import { StudioType } from '@/types/studios';
import { ProjectType } from '@/types/projects';
import ChatBotInput from './ChatBotInput';
import { useSendAliQueryMutation } from '@/redux/features/ali/aliApiSlice';
import { AliResultType } from '@/types/ali';
import { toast } from 'react-toastify';
import Image from 'next/image';
import StudiosDropdown from './StudiosDropdown'; // Import the StudiosDropdown component

interface ChatBotEmptyStateProps {
  project: ProjectType;
  onConversationStart: (
    conversationId: number,
    queryId: number,
    newAliResult: AliResultType
  ) => void;
}

const ChatBotEmptyState: React.FC<ChatBotEmptyStateProps> = ({
  project,
  onConversationStart,
}) => {
  // Select all studios by default
  const [selectedStudios, setSelectedStudios] = useState<number[]>(
    project?.studios.map((s) => s.id) || []
  );
  const [sendAliQuery] = useSendAliQueryMutation();

  const handleStudioSelect = (studioIds: number[]) => {
    setSelectedStudios(studioIds);
  };

  const handleStartConversation = async (initialMessage: string) => {
    if (selectedStudios.length === 0) {
      toast.error('Please select at least one group.');
      return;
    }

    try {
      const studioIds = selectedStudios;

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
    <div className="mt-[20vh] text-center h-full px-4 max-w-[900px] mx-auto">
      {/* Ali Image */}
      <Image src="/ali.svg" alt="Ali" width={80} height={80} className='mx-auto'/>
      <p className="mt-5 text-center">
        Hi, I'm Ali! To start a conversation, please select your study groups and ask a question.
      </p>

      {/* Studios Dropdown */}
      <div className="mb-4 mt-5 w-full mx-auto mt-[5vh]">
        {/* Group Header */}
        <h3 className="mb-4 font-semibold text-gray-900">Select your groups</h3>
        <StudiosDropdown
          studios={project?.studios || []}
          selectedStudios={selectedStudios}
          onStudioSelect={handleStudioSelect}
        />
      </div>

      {/* Chat Input */}
      <h3 className="mb-4 font-semibold text-gray-900">Ask a question</h3>

      <ChatBotInput
        onSendMessage={handleStartConversation}
        disabled={selectedStudios.length === 0}
      />
    </div>
  );
};

export default ChatBotEmptyState;