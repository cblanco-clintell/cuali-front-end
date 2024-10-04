// ChatBotInput.tsx

import React, { useState } from 'react';
import { VscSend, VscDebugStop } from 'react-icons/vsc';

interface ChatBotInputProps {
  onSendMessage: (message: string) => void;
  onStopGenerating: () => void;
  isGenerating: boolean;
  disabled?: boolean;
}

const ChatBotInput: React.FC<ChatBotInputProps> = ({
  onSendMessage,
  onStopGenerating,
  isGenerating,
  disabled = false,
}) => {
  const [message, setMessage] = useState('');

  const handleButtonClick = () => {
    if (isGenerating) {
      onStopGenerating();
    } else if (!disabled && message.trim()) {
      onSendMessage(message.trim());
      setMessage('');
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (disabled) {
      e.preventDefault();
      return;
    }
    if (e.key === 'Enter' && message.trim()) {
      e.preventDefault();
      onSendMessage(message.trim());
      setMessage('');
    }
  };

  return (
    <div className="w-full">
      <div className="relative w-full flex items-center">
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Ask something here..."
          className="w-full text-sm outline-none border border-zinc-400 rounded-lg px-4 pr-10 py-2 focus:border-accent focus:ring-1 focus:ring-accent"
        />
        <button
          onClick={handleButtonClick}
          className={`absolute right-1 p-2 rounded-lg ${
            isGenerating
              ? 'text-red-600 hover:text-white hover:bg-red-600'
              : disabled
              ? 'text-gray-400 cursor-not-allowed bg-gray-200'
              : 'text-accent hover:text-white hover:bg-accent'
          }`}
          disabled={disabled}
        >
          {isGenerating ? (
            <VscDebugStop className="w-4 h-4" />
          ) : (
            <VscSend className="w-4 h-4" />
          )}
        </button>
      </div>
      <div className="mt-2 text-xs text-neutral-500 text-center">
        Ali can make mistakes. Consider double-checking important information.
      </div>
    </div>
  );
};

export default ChatBotInput;