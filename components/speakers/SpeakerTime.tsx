import React from 'react';
import { useAppSelector } from '@/redux/hooks';
import { selectOrganizedSegments } from '@/redux/features/projects/projectSelectors';

interface SpeakerTimeProps {
  selectedStudioId: number | null;
  renamedSpeakers: Record<string, string>;
}

const SpeakerTime: React.FC<SpeakerTimeProps> = ({ selectedStudioId, renamedSpeakers }) => {
  const organizedSegments = useAppSelector(selectOrganizedSegments);

  const calculateSpeakerTime = (segments: any[]) => {
    return segments.reduce((total, segment) => total + (segment.end - segment.start), 0);
  };

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const filteredSegments = selectedStudioId
    ? organizedSegments[selectedStudioId]?.documents || {}
    : {};

  return (
    <div className="p-4 rounded-lg">
      {Object.entries(filteredSegments).map(([documentId, documentData]) => {
        const totalTime = Object.values(documentData.speakers).reduce(
          (total, segments) => total + calculateSpeakerTime(segments),
          0
        );

        return (
          <div key={documentId} className="mb-6">
            <h3 className="font-semibold text-gray-900 text-md">{documentData.document.name}</h3>
            <div className="grid grid-cols-2 gap-4">
              {Object.entries(documentData.speakers).map(([speaker, segments]) => {
                const speakerTime = calculateSpeakerTime(segments);
                const percentage = totalTime > 0 ? (speakerTime / totalTime) * 100 : 0;
                return (
                  <div key={speaker} className="bg-gray-100 p-2 rounded">
                    <p className="font-semibold">{renamedSpeakers[speaker] || speaker}</p>
                    <p>Speaking time: {formatTime(speakerTime)}</p>
                    <p>Percentage: {percentage.toFixed(2)}%</p>
                  </div>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default SpeakerTime;
