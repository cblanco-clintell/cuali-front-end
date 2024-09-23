import React from 'react';

const ChatBotInput = () => {
  return (
    <div className="h-20 w-full flex flex-col justify-center items-center">
      <div className="w-full flex justify-between items-center border border-zinc-400 rounded-lg px-3 py-2 bg-white">
        <input
          type="text"
          placeholder="Ask something here ...."
          className="w-full text-zinc-400 text-sm outline-none"
        />
        <button className="p-2 border border-zinc-300 rounded-lg">Send</button>
      </div>
      <div className="mt-2 text-xs text-neutral-500 text-center">
        Ali can make mistakes. Consider double-checking important information.
      </div>
    </div>
  );
};

export default ChatBotInput;