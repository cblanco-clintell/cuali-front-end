import React from 'react';
import UserMessage from './UserMessage';
import SystemMessage from './SystemMessage';

interface ChatBotResultProps {
  result: any;
  isGenerating: boolean;
}

const ChatBotResult: React.FC<ChatBotResultProps> = ({ result, isGenerating }) => {
  // Format the time of the result
  const time = new Date(result.created).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

  return (
    <div className="flex-grow overflow-auto">
      <UserMessage time={time} message={result.query} />
      <SystemMessage time={time} message={result.response} isGenerating={isGenerating} />
    </div>
  );
};

export default ChatBotResult;
