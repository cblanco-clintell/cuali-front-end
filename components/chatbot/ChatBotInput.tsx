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

  const handleSendClick = () => {
    if (!disabled && !isGenerating && message.trim()) {
      onSendMessage(message.trim());
      setMessage('');
    }
  };

  const handleStopClick = () => {
    onStopGenerating();
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (disabled || isGenerating) {
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
          className="w-full text-sm outline-none border border-zinc-400 rounded-lg px-4 pr-20 py-2 focus:border-accent focus:ring-1 focus:ring-accent"
          disabled={isGenerating}
        />
        {isGenerating ? (
          <button
            type="button"
            onClick={handleStopClick}
            className="absolute right-1 p-2 rounded-lg text-red-600 hover:text-white hover:bg-red-600"
          >
            <VscDebugStop className="w-5 h-5" />
          </button>
        ) : (
          <button
            type="button"
            onClick={handleSendClick}
            className={`absolute right-1 p-2 rounded-lg ${
              disabled || !message.trim()
                ? 'text-gray-400 cursor-not-allowed bg-gray-200'
                : 'text-accent hover:text-white hover:bg-accent'
            }`}
            disabled={disabled || !message.trim()}
          >
            <VscSend className="w-5 h-5" />
          </button>
        )}
      </div>
      <div className="mt-2 text-xs text-neutral-500 text-center">
        Ali can make mistakes. Consider double-checking important information.
      </div>
    </div>
  );
};

export default ChatBotInput;
