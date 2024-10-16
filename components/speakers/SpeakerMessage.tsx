import React from 'react';

interface SpeakerMessageProps {
    speaker: string;
    time: string;
    message: string;
}

const SpeakerMessage: React.FC<SpeakerMessageProps> = ({ speaker, time, message }) => {
  return (
    <div className="mt-3 flex">
      <div className="flex-shrink-0 w-32 pr-4 text-right">
        <div className="text-xs font-semibold truncate">{speaker}</div>
        <div className="text-xs text-zinc-400">{time}</div>
      </div>
      <div className="flex-grow">
        <div className="bg-white border-neutral-100 rounded-lg text-zinc-800 text-sm">
          {message}
        </div>
      </div>
    </div>
  );
};

export default SpeakerMessage;
