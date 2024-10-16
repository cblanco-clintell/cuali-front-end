import React, { useState, useEffect } from 'react';
import { useAppSelector } from '@/redux/hooks';
import { selectOrganizedSegments } from '@/redux/features/projects/projectSelectors';
import { ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/24/solid';

// Add renamedSpeakers to props
interface SpeakerTranscriptionsProps {
  selectedStudioId: number | null;
  renamedSpeakers: Record<string, string>;
}

const SpeakerTranscriptions: React.FC<SpeakerTranscriptionsProps> = ({ selectedStudioId, renamedSpeakers }) => {
  const organizedSegments = useAppSelector(selectOrganizedSegments);
  const [expandedDocuments, setExpandedDocuments] = useState<Set<number>>(new Set());
  const [expandedSpeakers, setExpandedSpeakers] = useState<Set<string>>(new Set());

  useEffect(() => {
    if (selectedStudioId && organizedSegments[selectedStudioId]?.documents) {
      const firstDocumentId = Object.keys(organizedSegments[selectedStudioId].documents)[0];
      if (firstDocumentId) {
        setExpandedDocuments(new Set([Number(firstDocumentId)]));
      }
    }
  }, [selectedStudioId, organizedSegments]);

  const toggleExpanded = (
    id: number | string, 
    expandedSet: Set<number | string>, 
    setExpandedSet: React.Dispatch<React.SetStateAction<Set<number | string>>>
  ) => {
    const newSet = new Set(expandedSet);
    if (newSet.has(id)) {
      newSet.delete(id);
    } else {
      newSet.add(id);
    }
    setExpandedSet(newSet);
  };

  const filteredSegments = selectedStudioId
    ? organizedSegments[selectedStudioId]?.documents || {}
    : {};

  return (
    <div className="p-4">
      {Object.entries(filteredSegments).map(([documentId, documentData]) => (
        <div key={documentId} className="mb-4 border rounded-lg p-4">
          <button 
            onClick={() => toggleExpanded(Number(documentId), expandedDocuments, setExpandedDocuments as any)}
            className="flex justify-between items-center w-full text-left font-bold text-lg"
          >
            <span>{documentData.document.name}</span>
            {expandedDocuments.has(Number(documentId)) ? <ChevronUpIcon className="h-5 w-5" /> : <ChevronDownIcon className="h-5 w-5" />}
          </button>
          
          {expandedDocuments.has(Number(documentId)) && Object.entries(documentData.speakers).map(([speaker, segments]) => (
            <div key={speaker} className="ml-4 mt-2 border-l-2 pl-4">
              <button 
                onClick={() => toggleExpanded(speaker, expandedSpeakers, setExpandedSpeakers as any)}
                className="flex justify-between items-center w-full text-left font-semibold"
              >
                <span>{renamedSpeakers[speaker] || speaker}</span>
                {expandedSpeakers.has(speaker) ? <ChevronUpIcon className="h-4 w-4" /> : <ChevronDownIcon className="h-4 w-4" />}
              </button>
              
              {expandedSpeakers.has(speaker) && (
                <div className="ml-4 mt-2">
                  {segments.map(segment => (
                    <p key={segment.id} className="text-sm mb-2">
                      <span className="text-gray-500">{formatTime(segment.start)} - {formatTime(segment.end)}</span>: {segment.transcription}
                    </p>
                  ))}
                </div>
              )}
            </div>
          ))}
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
