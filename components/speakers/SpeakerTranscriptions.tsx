import React, { useState } from 'react';
import { useAppSelector } from '@/redux/hooks';
import { getStudioDocumentSegments } from '@/redux/features/projects/projectSelectors';
import { Segment } from '@/types/segments';

interface SpeakerTranscriptionsProps {
  selectedDocumentId: number | null;
  renamedSpeakers: Record<string, string>;
}

const SpeakerTranscriptions: React.FC<SpeakerTranscriptionsProps> = ({ selectedDocumentId, renamedSpeakers }) => {
  const [expandedSpeakers, setExpandedSpeakers] = useState<Set<string>>(new Set());
  const segments = useAppSelector(state => 
    selectedDocumentId ? getStudioDocumentSegments(state, selectedDocumentId) : []
  );

  const speakerSegments: Record<string, Segment[]> = {};
  segments.forEach(segment => {
    if (!speakerSegments[segment.speaker]) {
      speakerSegments[segment.speaker] = [];
    }
    speakerSegments[segment.speaker].push(segment);
  });

  const toggleSpeaker = (speaker: string) => {
    setExpandedSpeakers(prev => {
      const newSet = new Set(prev);
      if (newSet.has(speaker)) {
        newSet.delete(speaker);
      } else {
        newSet.add(speaker);
      }
      return newSet;
    });
  };

  if (!selectedDocumentId) {
    return <p className="text-sm text-gray-500">Please select a document to view the transcriptions.</p>;
  }

  return (
    <div>
      {Object.entries(speakerSegments).map(([speaker, speakerSegments]) => (
        <div key={speaker} className="mb-4">
          <button
            onClick={() => toggleSpeaker(speaker)}
            className="flex items-center justify-between w-full p-2 bg-gray-100 hover:bg-gray-200 rounded"
          >
            <span>{renamedSpeakers[speaker] || speaker}</span>
            <span>{expandedSpeakers.has(speaker) ? '▼' : '▶'}</span>
          </button>
          {expandedSpeakers.has(speaker) && (
            <div className="mt-2 pl-4">
              {speakerSegments.map(segment => (
                <p key={segment.id} className="text-sm mb-2">
                  <span className="text-gray-500">
                    ({formatTime(segment.start)} - {formatTime(segment.end)})
                  </span>
                  : {segment.transcription}
                </p>
              ))}
            </div>
          )}
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

export default SpeakerTranscriptions;
