import React, { useState, useRef, useEffect } from 'react';
import { useAppSelector } from '@/redux/hooks';
import { getStudioDocumentSegments, selectSelectedProject } from '@/redux/features/projects/projectSelectors';
import { Segment } from '@/types/segments';
import SpeakerMessage from './SpeakerMessage';

interface FullTranscriptionProps {
  selectedDocumentId: number | null;
  renamedSpeakers: Record<string, string>;
}

const FullTranscription: React.FC<FullTranscriptionProps> = ({ selectedDocumentId, renamedSpeakers }) => {
  const [activeSpeakers, setActiveSpeakers] = useState<Set<string>>(new Set());
  const segments = useAppSelector(state => 
    selectedDocumentId ? getStudioDocumentSegments(state, selectedDocumentId) : []
  );
  const selectedProject = useAppSelector(selectSelectedProject);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = 0; // Scroll to top when segments change
    }
  }, [segments]);

  const toggleSpeaker = (speaker: string) => {
    setActiveSpeakers(prev => {
      const newSet = new Set(prev);
      if (newSet.has(speaker)) {
        newSet.delete(speaker);
      } else {
        newSet.add(speaker);
      }
      return newSet;
    });
  };

  const clearFilters = () => {
    setActiveSpeakers(new Set());
  };

  const allSpeakers = new Set(segments.map(segment => segment.speaker));

  const filteredSegments = segments.filter(segment => 
    activeSpeakers.size === 0 || activeSpeakers.has(segment.speaker)
  );

  const studioDocuments = selectedProject?.studios.flatMap(studio => studio.studio_documents) || [];
  const currentDocument = studioDocuments.find(doc => doc.id === selectedDocumentId);

  if (!selectedDocumentId) {
    return <p className="text-sm text-gray-500">Please select a document to view the transcription.</p>;
  }

  return (
    <div className="flex flex-col h-full w-full mx-auto relative bg-white max-h-[87vh]">
      <div className="p-4">
        <h2 className="text-xl font-bold mb-4">{currentDocument?.name || 'Transcription'}</h2>
        {studioDocuments.length > 1 && (
          <>
            <div className="flex justify-between items-center mb-2">
              <h3 className="text-lg font-semibold text-xs">Filter by Speaker</h3>
              {activeSpeakers.size > 0 && (
                <button
                  onClick={clearFilters}
                  className="text-sm text-blue-500 hover:text-blue-700"
                >
                  Clear
                </button>
              )}
            </div>
            <div className="flex flex-wrap items-center">
              {Array.from(allSpeakers).map(speaker => (
                <button
                  key={speaker}
                  onClick={() => toggleSpeaker(speaker)}
                  className={`mr-2 mb-2 px-3 py-1 rounded-full text-sm ${
                    activeSpeakers.has(speaker) ? 'bg-blue-500 text-white' : 'bg-gray-200'
                  }`}
                >
                  {renamedSpeakers[speaker] || speaker}
                </button>
              ))}
            </div>
          </>
        )}
      </div>
      <div ref={scrollRef} className="flex-1 overflow-auto p-4">
        {filteredSegments.length > 0 ? (
          filteredSegments.map(segment => (
            <SpeakerMessage
              key={segment.id}
              speaker={renamedSpeakers[segment.speaker] || segment.speaker}
              time={formatTime(segment.start)}
              message={segment.transcription}
            />
          ))
        ) : (
          <p className="text-sm text-gray-500">No segments available for this document.</p>
        )}
      </div>
    </div>
  );
};

// Helper function to format time in MM:SS format
const formatTime = (seconds: number): string => {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = Math.floor(seconds % 60);
  return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
};

export default FullTranscription;
