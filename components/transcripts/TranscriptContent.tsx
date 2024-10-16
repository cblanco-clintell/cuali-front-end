import React, { useEffect, useRef } from 'react';
import { useAppSelector } from '@/redux/hooks';
import { getStudioDocumentSegments } from '@/redux/features/projects/projectSelectors';
import { Segment } from '@/types/segments';

interface TranscriptContentProps {
  studioDocumentId: number;
  selectedSegmentId: number;
}

const TranscriptContent: React.FC<TranscriptContentProps> = ({ studioDocumentId, selectedSegmentId }) => {
  const segments = useAppSelector(state => getStudioDocumentSegments(state, studioDocumentId));
  const selectedSegmentRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (selectedSegmentRef.current) {
      selectedSegmentRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }, [selectedSegmentId, studioDocumentId]);

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = 0;
    }
  }, [studioDocumentId]);

  return (
    <div ref={containerRef} className="p-4 overflow-auto h-full">
      {segments.sort((a, b) => a.start - b.start).map((segment: Segment) => (
        <div 
          key={segment.id} 
          ref={segment.id === selectedSegmentId ? selectedSegmentRef : null}
          className={`mt-3 flex ${segment.id === selectedSegmentId ? 'bg-yellow-100' : ''}`}
        >
          <div className="flex-shrink-0 w-32 pr-4 text-right">
            <div className="text-xs font-semibold truncate">{segment.speaker}</div>
            <div className="text-xs text-zinc-400">{formatTime(segment.start)}</div>
          </div>
          <div className="flex-grow">
            <div className={`bg-white border-neutral-100 rounded-lg text-zinc-800 text-sm p-2 ${segment.id === selectedSegmentId ? '' : ''}`}>
              {segment.transcription}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

// Helper function to format time in MM:SS format
const formatTime = (seconds: number): string => {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = Math.floor(seconds % 60);
  return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
};

export default TranscriptContent;
