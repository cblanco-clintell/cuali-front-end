import React, { useState, useRef, useEffect } from 'react';

interface ResizableColumnsProps {
  leftColumn: React.ReactNode;
  rightColumn: React.ReactNode;
  minLeftWidth: number;
  minRightWidth: number;
  initialLeftWidth?: number;
}

const ResizableColumns: React.FC<ResizableColumnsProps> = ({
  leftColumn,
  rightColumn,
  minLeftWidth,
  minRightWidth,
  initialLeftWidth = 50,
}) => {
  const [leftColumnWidth, setLeftColumnWidth] = useState(initialLeftWidth);
  const dragRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (containerRef.current) {
      const containerRect = containerRef.current.getBoundingClientRect();
      const newWidth = ((e.clientX - containerRect.left) / containerRect.width) * 100;
      setLeftColumnWidth(Math.min(Math.max(newWidth, minLeftWidth), 100 - minRightWidth));
    }
  };

  const handleMouseUp = () => {
    document.removeEventListener('mousemove', handleMouseMove);
    document.removeEventListener('mouseup', handleMouseUp);
  };

  useEffect(() => {
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, []);

  return (
    <div ref={containerRef} className="flex relative">
      <div style={{ width: `${leftColumnWidth}%` }} className="pr-4">
        {leftColumn}
      </div>
      <div
        ref={dragRef}
        className="w-1 bg-gray-200 cursor-col-resize absolute top-0 bottom-0"
        style={{ left: `${leftColumnWidth}%` }}
        onMouseDown={handleMouseDown}
      />
      <div style={{ width: `${100 - leftColumnWidth}%` }} className="pl-4">
        {rightColumn}
      </div>
    </div>
  );
};

export default ResizableColumns;