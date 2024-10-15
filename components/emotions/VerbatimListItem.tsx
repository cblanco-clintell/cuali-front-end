import React from 'react';
import { useAppSelector } from '@/redux/hooks';
import { getStudioByDocumentID, getStudioDocumentByID } from '@/redux/features/projects/projectSelectors';
import { Segment } from '@/types/segments';

interface VerbatimListItemProps {
  segment: Segment;
  onClick: () => void;
}

const VerbatimListItem: React.FC<VerbatimListItemProps> = ({ segment, onClick }) => {
  const studio = useAppSelector(state => 
    getStudioByDocumentID(state, segment.studio_document ?? 0)
  );
  const studioDocument = useAppSelector(state => 
    getStudioDocumentByID(state, segment.studio_document ?? 0)
  );

  return (
    <div className="p-3 bg-white rounded-lg cursor-pointer" onClick={onClick}>
      <p className="text-gray-500 text-xs mb-1">
        {studio?.name} | {studioDocument?.name}
      </p>
      <div className="text-gray-700 text-sm">{segment.transcription}</div>
    </div>
  );
};

export default VerbatimListItem;