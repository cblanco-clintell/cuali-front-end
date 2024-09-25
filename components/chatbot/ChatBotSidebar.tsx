"use client";
import React from 'react';
import { FiBookmark } from "react-icons/fi";
import { useUpdateConversationMutation } from '@/redux/features/ali/aliApiSlice';
import { toast } from 'react-toastify';

interface ChatBotSidebarProps {
  conversations: any[];
  handleConversationClick: (conversationId: number) => void;
  isLoading: boolean;
  error: any;
  selectedConversationId: number | null;
}

const truncateText = (text: string, maxLength: number) => {
  if (text.length > maxLength) {
    return text.slice(0, maxLength) + '...';
  }
  return text;
};

const ChatBotSidebar: React.FC<ChatBotSidebarProps> = ({
  conversations,
  handleConversationClick,
  isLoading,
  error,
  selectedConversationId,
}) => {
  const [updateConversation] = useUpdateConversationMutation(); // Mutation to update the conversation

  if (isLoading) return <p>Loading conversations...</p>;
  if (error) return <p>Error loading conversations.</p>;

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
    } catch (err) {
      console.error('Failed to toggle saved status:', err.message);
      toast.error(err.message || 'Failed to update saved status.');
    }
  };

  return (
    <aside className="px-4 py-6 shadow border-r border-zinc-300 flex flex-col items-start h-[87vh]">
      <div className="w-full flex flex-col gap-4">
        <h2 className="text-slate-600 text-sm font-semibold">Past Conversations</h2>
        {conversations.length === 0 && <p className="text-zinc-800 text-xs">No conversations found.</p>}
        <div>
          {conversations.map((conversation) => (
            <div
              key={conversation.id}
              className={`w-full p-2 border-b border-zinc-300 flex items-center justify-between cursor-pointer
                ${conversation.id === selectedConversationId ? 'bg-blue-100' : 'hover:bg-zinc-100'}
              `}
              onClick={() => handleConversationClick(conversation.id)}
            >
              <span className="text-zinc-800 text-xs">
                {truncateText(conversation.title, 37)}
              </span>

              {/* Bookmark icon with toggle saved functionality */}
              <FiBookmark
                className={`text-zinc-800 text-xs font-normal ${conversation.saved ? 'fill-current text-yellow-400' : ''}`}
                onClick={(e) => {
                  e.stopPropagation(); // Prevent the click from triggering the handleConversationClick
                  handleToggleSaved(conversation); // Toggle saved status
                }}
              />
            </div>
          ))}
        </div>
      </div>
    </aside>
  );
};

export default ChatBotSidebar;