import React from 'react';
import { formatMessage } from '@/utils/formatMessage'; // Assuming the utility function is saved in utils
import Image from 'next/image';

interface SystemMessageProps {
  time: string;
  message: string;
  isGenerating: boolean;
}

const SystemMessage: React.FC<SystemMessageProps> = ({ time, message, isGenerating }) => {
  const formattedMessage = formatMessage(message);

  return (
    <div className="mt-5">
      <div className="text-xs text-zinc-400 flex gap-1 items-center">
        <div className="text-white flex items-center justify-center w-[23px] h-[22px] rounded-full">
          <Image src="/ali.svg" alt="Ali" width={20} height={20} />
        </div>
        {time}
      </div>
      <div className="bg-white border-neutral-100 rounded-lg p-5 text-zinc-800 text-sm mt-1">
        <span 
          dangerouslySetInnerHTML={{ __html: formattedMessage }} 
          className="inline"
        />
        {isGenerating && (
          <span className="inline-block animate-bounce align-text-bottom ml-1">
            <Image src="/ali.svg" alt="Generating" width={16} height={16} />
          </span>
        )}
      </div>
    </div>
  );
};

export default SystemMessage;
