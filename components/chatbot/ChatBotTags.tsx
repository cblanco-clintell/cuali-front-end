import React from 'react';

const ChatBotTags = () => {
  const tags = ['Estudio iPhone 12', 'Group Millennials', 'Group Baby Boomers', 'Group Gen-Z'];

  return (
    <div className="flex gap-2 mb-4">
      {tags.map((tag, index) => (
        <div key={index} className="px-2 py-1 bg-slate-100 rounded-lg text-neutral-500 text-xs">
          {tag}
        </div>
      ))}
    </div>
  );
};

export default ChatBotTags;