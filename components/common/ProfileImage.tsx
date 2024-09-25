import React from 'react';

interface ProfileImageProps {
    letter?: string;
}

export default function ProfileImage({
    letter = "C"
 }: ProfileImageProps) {
  return (
    <div className="bg-primary text-white flex items-center justify-center w-[23px] h-[22px] rounded-full">
      <span className="text-white text-xs">
        {letter || "C"}
      </span>
    </div>
  );
}