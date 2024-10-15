import React, { useEffect, useRef } from 'react';
import { useAppSelector } from '@/redux/hooks';
import { getStudioDocumentSegments } from '@/redux/features/projects/projectSelectors';
import { Segment } from '@/types/segments';
import { XMarkIcon } from '@heroicons/react/24/solid';

interface TranscriptSidePanelProps {
  studioDocumentId: number;
  selectedSegmentId: number;
  onClose: () => void;
}

const TranscriptSidePanel: React.FC<TranscriptSidePanelProps> = ({ studioDocumentId, selectedSegmentId, onClose }) => {
  const segments = useAppSelector(state => getStudioDocumentSegments(state, studioDocumentId));
  const selectedSegmentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (selectedSegmentRef.current) {
      selectedSegmentRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }, [selectedSegmentId]);

  return (
    <div className="fixed inset-y-0 right-0 w-1/3 bg-white shadow-xl z-50 overflow-hidden flex flex-col">
      <div className="flex justify-between items-center p-4 border-b">
        <h2 className="text-xl font-bold">Transcript</h2>
        <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
          <XMarkIcon className="h-6 w-6" />
        </button>
      </div>
      <div className="flex-grow overflow-y-auto p-4">
        {segments.sort((a, b) => a.id - b.id).map((segment: Segment) => (
          <div 
            key={segment.id} 
            ref={segment.id === selectedSegmentId ? selectedSegmentRef : null}
            className={`p-2 mb-2 rounded ${segment.id === selectedSegmentId ? 'font-bold bg-yellow-100' : 'bg-gray-50'}`}
          >
            <p>{segment.transcription}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TranscriptSidePanel;