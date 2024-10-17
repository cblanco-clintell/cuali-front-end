import React, { useEffect, useRef } from 'react';

interface PopupProps {
  onClose: () => void;
  children: React.ReactNode;
  extraClasses?: string | undefined;
}

const Popup: React.FC<PopupProps> = ({ onClose, children, extraClasses }) => {
  const modalRef = useRef<HTMLDivElement>(null);
  extraClasses = extraClasses || 'min-w-[500px]';

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        onClose();
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [onClose]);

  return (
    <div className="absolute inset-0 flex items-center justify-center z-50 backdrop-blur">
      <div
        className={`relative bg-white rounded-lg border border-gray-200 ${extraClasses}`}
        ref={modalRef}
      >
        <div className="relative">
          {/* Close button inside the content */}
          <button
            onClick={onClose}
            className="absolute top-1 right-2 text-gray-600 hover:text-gray-900"
          >
            &#x2715;
          </button>
          {/* Children content goes here */}
          <div className='p-5'>
          {children}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Popup;