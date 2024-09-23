import React from 'react';

interface UserMessageProps {
  time: string;
  message: string;
}

const UserMessage: React.FC<UserMessageProps> = ({ time, message }) => {
  return (
    <div className="flex flex-col items-end mb-2">
      <div className="text-xs text-zinc-400">{time}</div>
      <div className="bg-gray-50 border border-neutral-100 rounded-lg p-2 text-zinc-800 text-sm max-w-xs">
        {message}
      </div>
    </div>
  );
};

export default UserMessage;