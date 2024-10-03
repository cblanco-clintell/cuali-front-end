"use client";
import React from 'react';
import { FiBookmark } from "react-icons/fi";

interface ChatBotSidebarProps {
  conversations: any[];
  handleConversationClick: (conversationId: number) => void;
  isLoading: boolean;
  error: any;
  selectedConversationId: number | null;
  handleToggleSaved: (conversation: any) => void; // Added prop to handle save toggle
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
  handleToggleSaved, // Get the function as a prop
}) => {
  if (isLoading) return <p>Loading conversations...</p>;
  if (error) return <p>Error loading conversations.</p>;

  return (
    <aside className="px-4 py-6 shadow border-r border-zinc-300 flex flex-col items-start h-[87vh] overflow-y-auto bg-gray-50">
      <div className="w-full flex flex-col gap-4">
        <h2 className="text-slate-600 text-sm font-semibold">Past Conversations</h2>
        {conversations?.length === 0 && <p className="text-zinc-800 text-xs">No conversations found.</p>}
        <div>
          {conversations?.map((conversation) => (
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
                className={`text-zinc-800 text-xs font-normal ${conversation.saved ? 'fill-current' : ''}`}
                onClick={(e) => {
                  e.stopPropagation(); // Prevent the click from triggering the handleConversationClick
                  handleToggleSaved(conversation); // Call the prop function to toggle saved status
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