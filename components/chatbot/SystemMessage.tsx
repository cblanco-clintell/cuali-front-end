import React from 'react';

interface SystemMessageProps {
  time: string;
  message: string;
}

const SystemMessage: React.FC<SystemMessageProps> = ({ time, message }) => {
  return (
    <div className="flex flex-col items-start mb-2">
      <div className="text-xs text-zinc-400">{time}</div>
      <div className="bg-neutral-50 border border-neutral-100 rounded-lg p-2 text-zinc-800 text-sm max-w-xs">
        {message}
      </div>
    </div>
  );
};

export default SystemMessage;