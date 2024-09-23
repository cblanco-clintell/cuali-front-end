import React from "react";

const savedMessages = [
  "Tell me which group has more repetitive keywords about the screen?",
  "Give me a resume about the study of the iPhone only considering answers about Group 1."
];

const pastConversations = [
  "Tell me which group has more repetitive keywords about the screen?",
  "Which is the most important insight according to the group selected?",
  "Tell me which group has more repetitive keywords about the screen?"
];

const ChatBotSidebar: React.FC = () => {
  return (
    <aside className="px-4 py-6 bg-white shadow border-r border-zinc-300 flex flex-col items-start h-full">
      {/* New Conversation Button */}
      <div className="justify-start items-center gap-3 mb-6">
        <button className="px-3.5 py-2 bg-white rounded-lg shadow border border-gray-300 flex items-center gap-2">
          <div className="w-5 h-5 flex justify-center items-center">
            <span className="block w-full h-full bg-gray-400 rounded-full" />
          </div>
          <span className="text-slate-700 text-sm font-semibold">New Conversation</span>
        </button>
      </div>

      {/* Saved Messages Section */}
      <div className="flex flex-col gap-4 w-full min-h-[30vh]">
        <h2 className="text-slate-600 text-sm font-semibold">Saved</h2>
        {savedMessages.map((message, index) => (
          <div key={index} className="w-full h-12 p-2 border-b border-zinc-300 flex items-center">
            <span className="text-zinc-800 text-xs font-normal">{message}</span>
          </div>
        ))}
      </div>

      {/* Past Conversations Section */}
      <div className="w-full flex flex-col gap-4">
        <h2 className="text-slate-600 text-sm font-semibold">Past Conversations</h2>
        {pastConversations.map((conversation, index) => (
          <div key={index} className="w-full h-12 p-2 border-b border-zinc-300 flex items-center">
            <span className="text-zinc-800 text-xs font-normal">{conversation}</span>
          </div>
        ))}
      </div>
    </aside>
  );
};

export default ChatBotSidebar;