import React from 'react';
import { XMarkIcon } from '@heroicons/react/24/solid';

interface SidePanelProps {
  title: string;
  onClose: () => void;
  children: React.ReactNode;
  width?: string;
}

const SidePanel: React.FC<SidePanelProps> = ({ title, onClose, children, width = 'w-1/3' }) => {
  return (
    <div className={`fixed inset-y-0 right-0 ${width} bg-white shadow-xl z-50 overflow-hidden flex flex-col`}>
      <div className="flex justify-between items-center p-4 border-b">
        <h2 className="text-xl font-bold">{title}</h2>
        <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
          <XMarkIcon className="h-6 w-6" />
        </button>
      </div>
      <div className="flex-grow overflow-y-auto">
        {children}
      </div>
    </div>
  );
};

export default SidePanel;