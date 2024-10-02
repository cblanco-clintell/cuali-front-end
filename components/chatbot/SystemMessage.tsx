import React from 'react';
import { formatMessage } from '@/utils/formatMessage'; // Assuming the utility function is saved in utils

interface SystemMessageProps {
  time: string;
  message: string;
}

const SystemMessage: React.FC<SystemMessageProps> = ({ time, message }) => {
  const formattedMessage = formatMessage(message);

  return (
    <div className="mt-5">
      <div className="text-xs text-zinc-400 flex gap-1 items-center">
        <div className="text-white flex items-center justify-center w-[23px] h-[22px] rounded-full">
          <img src="/ali.svg" alt="favicon" className="w-5 h-5" />
        </div>
        {time}
      </div>
      <div className="bg-white border-neutral-100 rounded-lg p-5 text-zinc-800 text-sm mt-1">
        {/* Render formatted and sanitized HTML */}
        <div dangerouslySetInnerHTML={{ __html: formattedMessage }} />
      </div>
    </div>
  );
};

export default SystemMessage;