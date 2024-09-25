"use client";
import React from 'react';
import { FiBookmark } from "react-icons/fi";

interface ChatBotSidebarProps {
  conversations: any[];
  handleConversationClick: (conversationId: number) => void;
  isLoading: boolean;
  error: any;
  selectedConversationId: number | null; // New prop to track selected conversation
}

// Function to truncate text with ellipsis
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
  selectedConversationId, // Receiving the selected conversation ID
}) => {
  
  if (isLoading) return <p>Loading conversations...</p>;
  if (error) return <p>Error loading conversations.</p>;

  return (
    <aside className="px-2 py-6 shadow border-r border-zinc-300 flex flex-col items-start h-[87vh]">
      {/* Past Conversations Section */}
      <div className="w-full flex flex-col gap-4">
        <h2 className="text-slate-600 text-sm font-semibold">Past Conversations</h2>
        {conversations.length === 0 && <p className='text-zinc-800 text-xs'>No conversations found.</p>}
        <div>
          {conversations.map((conversation) => (
            <div
              key={conversation.id}
              className={`w-full p-2 border-b border-zinc-300 flex items-center justify-between cursor-pointer
                ${conversation.id === selectedConversationId ? 'bg-blue-100' : 'hover:bg-zinc-100'}
              `}
              onClick={() => handleConversationClick(conversation.id)} // Set the selected conversation on click
            >
              <span className="text-zinc-800 text-xs">
                {truncateText(conversation.title, 35)}
              </span>
              {conversation.saved && <FiBookmark className="text-zinc-800 text-xs font-normal" />}
            </div>
          ))}
        </div>
      </div>
    </aside>
  );
};

export default ChatBotSidebar;