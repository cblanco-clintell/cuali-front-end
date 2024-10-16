import React, { useState, useEffect } from 'react';
import { useAppSelector } from '@/redux/hooks';
import { selectOrganizedSegments } from '@/redux/features/projects/projectSelectors';

interface SpeakerRenameProps {
  selectedStudioId: number | null;
  renamedSpeakers: Record<string, string>;
  onRenameSpeaker: (originalName: string, newName: string) => void;
}

const SpeakerRename: React.FC<SpeakerRenameProps> = ({ selectedStudioId, renamedSpeakers, onRenameSpeaker }) => {
  const organizedSegments = useAppSelector(selectOrganizedSegments);
  const [editingSpeaker, setEditingSpeaker] = useState<string | null>(null);
  const [newName, setNewName] = useState('');

  const filteredSegments = selectedStudioId
    ? organizedSegments[selectedStudioId]?.documents || {}
    : {};

  const allSpeakers = new Set<string>();
  Object.values(filteredSegments).forEach(documentData => {
    Object.keys(documentData.speakers).forEach(speaker => allSpeakers.add(speaker));
  });

  const handleDoubleClick = (speaker: string) => {
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
    <div className="p-4 rounded-lg bg-white">
      <div className="grid grid-cols-2 gap-4">
        {Array.from(allSpeakers).map(speaker => (
          <div key={speaker} className="bg-gray-100 p-2 rounded">
            {editingSpeaker === speaker ? (
              <input
                type="text"
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
                onBlur={handleRename}
                onKeyPress={(e) => e.key === 'Enter' && handleRename()}
                autoFocus
                className="w-full p-1 border rounded"
              />
            ) : (
              <p onDoubleClick={() => handleDoubleClick(speaker)} className="cursor-pointer">
                {renamedSpeakers[speaker] || speaker}
              </p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default SpeakerRename;