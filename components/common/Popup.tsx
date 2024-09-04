import React, { useEffect, useRef } from 'react';

interface PopupProps {
  onClose: () => void;
  children: React.ReactNode;
  extraClasses?: string | undefined;
}

const Popup: React.FC<PopupProps> = ({ onClose, children, extraClasses }) => {
  const modalRef = useRef<HTMLDivElement>(null);

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
    <div className="absolute inset-0 w-[102%] h-[102vh] max-h-screen flex items-center justify-center z-50 backdrop-blur -m-[1%]">
      <div className={`bg-white rounded-lg border border-gray-200 p-5 ${extraClasses}`} ref={modalRef}>
        <button onClick={onClose} className="absolute top-2 right-2 text-gray-600 hover:text-gray-900">
          &#x2715;
        </button>
        {children}
      </div>
    </div>
  );
};

export default Popup;
