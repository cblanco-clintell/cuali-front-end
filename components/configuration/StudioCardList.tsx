import React from 'react';
import StudioCard from './StudioCard';
import { StudioModel } from '@/types/studios'; // Adjust the import path as needed
import { FiPlus } from 'react-icons/fi';

interface StudioCardListProps {
  studios: StudioModel[];
  onUpload: (studioId: number, file: File) => void;
  onAddStudio: () => void;
  onEditStudio: (studio: StudioModel) => void;
  onDeleteStudio: (studio: StudioModel) => void;
}

const StudioCardList: React.FC<StudioCardListProps> = ({ studios, onUpload, onAddStudio, onEditStudio, onDeleteStudio }) => {
  return (
    <div className="space-y-2">
      <div className="flex justify-between items-center">
        <h3 className="text-sm font-medium leading-6 text-gray-900">Studios</h3>
        <button
          onClick={onAddStudio}
          className="inline-flex items-center rounded-md bg-white px-2 py-1 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
        >
          <FiPlus className="w-4 h-4 mr-1" />
          Add Studio
        </button>
      </div>
      {studios.map((studio) => (
        <StudioCard 
          key={studio.id} 
          studio={studio} 
          onUpload={onUpload}
          onEdit={() => onEditStudio(studio)}
          onDelete={() => onDeleteStudio(studio)}
        />
      ))}
    </div>
  );
};

export default StudioCardList;
