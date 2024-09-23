import React from 'react';
import ChatBotTags from './ChatBotTags';
import UserMessage from './UserMessage';
import SystemMessage from './SystemMessage';
import ChatBotInput from './ChatBotInput';

const ChatBotBox = () => {
  return (
    <div className="w-full h-full min-h-[85vh] bg-white p-3 rounded-xl border border-zinc-300 flex flex-col justify-between">
      {/* Tags at the top */}
      <ChatBotTags />

      {/* Chat Messages */}
      <div className="flex-grow overflow-auto">
        <SystemMessage time="12:00pm" message="What elements of the product do not fit as premium?" />
        <UserMessage time="12:01pm" message="Examine the performance of the wide-angle camera, especially in low-light conditions." />
      </div>

      {/* Input Area */}
      <ChatBotInput />
    </div>
  );
};

export default ChatBotBox;