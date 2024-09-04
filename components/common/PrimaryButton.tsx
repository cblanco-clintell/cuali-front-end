import React from 'react';

interface PrimaryButtonProps {
  text: string;
  onClick: () => void;
  icon?: React.ReactNode;
  className?: string;
  disabled?: boolean;
}

const PrimaryButton: React.FC<PrimaryButtonProps> = ({ text, onClick, icon, className, disabled }) => {
  return (
    <button
      className={`mb-2 px-4 py-2 rounded text-sm flex justify-center items-center border ${disabled ? 'bg-gray-300 text-gray-500 border-gray-300 cursor-not-allowed' : 'bg-primary text-white border-primary hover:bg-primary-dark'} ${className}`}
      onClick={onClick}
      disabled={disabled}
    >
      {icon && <span className="mr-2">{icon}</span>}
      {text}
    </button>
  );
};

export default PrimaryButton;