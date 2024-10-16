import React, { useState } from 'react';
import { useAppSelector } from '@/redux/hooks';
import { selectOrganizedSegments } from '@/redux/features/projects/projectSelectors';
import { FiEdit2 } from 'react-icons/fi';

interface SpeakerTimeProps {
  selectedStudioId: number | null;
  renamedSpeakers: Record<string, string>;
  onRenameSpeaker: (originalName: string, newName: string) => void;
}

const SpeakerTime: React.FC<SpeakerTimeProps> = ({ selectedStudioId, renamedSpeakers, onRenameSpeaker }) => {
  const organizedSegments = useAppSelector(selectOrganizedSegments);
  const [editingSpeaker, setEditingSpeaker] = useState<string | null>(null);
  const [newName, setNewName] = useState('');

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

  const handleEditClick = (speaker: string) => {
    setEditingSpeaker(speaker);
    setNewName(renamedSpeakers[speaker] || speaker);
  };

  const handleRename = () => {
    if (editingSpeaker && newName.trim() !== '') {
      onRenameSpeaker(editingSpeaker, newName.trim());
      setEditingSpeaker(null);
    }
  };

  return (
    <div className="p-4 rounded-lg">
      {Object.entries(filteredSegments).map(([documentId, documentData]) => {
        const totalTime = Object.values(documentData.speakers).reduce(
          (total, segments) => total + calculateSpeakerTime(segments),
          0
        );

        return (
          <div key={documentId} className="">
            <h3 className="font-semibold text-gray-900 text-md">Audio: {documentData.document.name}</h3>
            <div className="grid grid-cols-4 gap-4 mt-2">
              {Object.entries(documentData.speakers).map(([speaker, segments]) => {
                const speakerTime = calculateSpeakerTime(segments);
                const percentage = totalTime > 0 ? (speakerTime / totalTime) * 100 : 0;
                return (
                  <div key={speaker} className="bg-gray-100 p-2 rounded">
                    <div className="flex items-center justify-between">
                      {editingSpeaker === speaker ? (
                        <input
                          type="text"
                          value={newName}
                          onChange={(e) => setNewName(e.target.value)}
                          onBlur={handleRename}
                          onKeyPress={(e) => e.key === 'Enter' && handleRename()}
                          autoFocus
                          className="w-full p-1 border rounded text-sm"
                        />
                      ) : (
                        <>
                          <p className="text-sm">{renamedSpeakers[speaker] || speaker}</p>
                          <button onClick={() => handleEditClick(speaker)} className="text-gray-500 hover:text-gray-700">
                            <FiEdit2 size={14} />
                          </button>
                        </>
                      )}
                    </div>
                    <p className="text-xs">{formatTime(speakerTime)} - {percentage.toFixed(2)}%</p>
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
