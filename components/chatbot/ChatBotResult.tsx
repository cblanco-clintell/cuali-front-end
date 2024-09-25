import React from 'react';
import UserMessage from './UserMessage';
import SystemMessage from './SystemMessage';

const ChatBotResult = ({ result }) => {
  // Format the time of the result
  const time = new Date(result.created).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

  return (
    <div className="flex-grow overflow-auto">
      <UserMessage time={time} message={result.query} />
      <SystemMessage time={time} message={result.response} />
    </div>
  );
};

export default ChatBotResult;
