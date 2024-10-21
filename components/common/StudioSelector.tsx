import React, { useEffect } from 'react';
import { useAppSelector } from '@/redux/hooks';
import { selectSelectedProject } from '@/redux/features/projects/projectSelectors';

interface StudioSelectorProps {
  selectedStudioId: number | null;
  onStudioSelect: (studioId: number | null) => void;
}

const StudioSelector: React.FC<StudioSelectorProps> = ({ selectedStudioId, onStudioSelect }) => {
  const selectedProject = useAppSelector(selectSelectedProject);

  useEffect(() => {
    if (selectedProject && selectedProject.studios.length > 0 && !selectedStudioId) {
      onStudioSelect(selectedProject.studios[0].id);
    }
  }, [selectedProject, selectedStudioId, onStudioSelect]);

  if (!selectedProject) return null;

  return (
    <div className="mb-4">
      <label htmlFor="studio-select" className="block text-sm font-medium text-gray-700">
        Select Studio
      </label>
      <select
        id="studio-select"
        value={selectedStudioId || ''}
        onChange={(e) => onStudioSelect(e.target.value ? Number(e.target.value) : null)}
        className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
      >
        {/* <option value="">All Studios</option> */}
        {selectedProject.studios.map((studio) => (
          <option key={studio.id} value={studio.id}>
            {studio.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default StudioSelector;
