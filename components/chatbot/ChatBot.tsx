import React from 'react';
import ChatBotBox from './ChatBotBox';

const ChatBot = () => {
  return (
    <div className="p-4 m-10 rounded-xl shadow flex flex-col justify-between items-center">
      <ChatBotBox />
    </div>
  );
};

export default ChatBot;