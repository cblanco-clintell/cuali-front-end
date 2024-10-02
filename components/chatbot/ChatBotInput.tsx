import { useState } from 'react';
import React from 'react';
import { VscSend } from "react-icons/vsc";

const ChatBotInput = ({ handleSendAliQuery }: { handleSendAliQuery: (textGenerate: string) => void }) => {
  const [query, setQuery] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      handleSendAliQuery(query.trim());
      setQuery('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full">
      <div className="relative w-full flex items-center">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Ask something here ...."
          className="w-full text-zinc-400 text-sm outline-none border border-zinc-400 rounded-lg px-4 pr-10 py-2 focus:border-accent focus:ring-1 focus:ring-accent"
        />
        <button 
          type="submit"
          className="absolute right-1 p-2 text-accent hover:text-white hover:bg-accent rounded-lg"
        >
          <VscSend className='w-4 h-4' />
        </button>
      </div>
      <div className="mt-2 text-xs text-neutral-500 text-center">
        Ali can make mistakes. Consider double-checking important information.
      </div>
    </form>
  );
};

export default ChatBotInput;