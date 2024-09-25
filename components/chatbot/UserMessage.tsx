import React from 'react';
import { ProfileImage } from '../common';

interface UserMessageProps {
  time: string;
  message: string;
}

const UserMessage: React.FC<UserMessageProps> = ({ time, message }) => {
  return (
    <div className="flex flex-col items-end w-full mt-5">
      <div className="text-xs text-zinc-400 flex gap-1 items-center"> <ProfileImage/>{time}</div>
      <div className="bg-white border border-neutral-100 rounded-lg px-5 py-3 text-zinc-800 text-sm mt-1">
        {message}
      </div>
    </div>
  );
};

export default UserMessage;