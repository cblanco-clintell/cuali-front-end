import React from 'react';

interface SecondaryButtonProps {
  text: string;
  onClick: () => void;
  className?: string;
}

const SecondaryButton: React.FC<SecondaryButtonProps> = ({ text, onClick, className = '' }) => {
  return (
    <button
      className={`mb-2 px-4 py-2 bg-white rounded text-sm flex justify-center items-center border border-gray-300 ${className}`}
      onClick={onClick}
    >
      {text}
    </button>
  );
};

export default SecondaryButton;