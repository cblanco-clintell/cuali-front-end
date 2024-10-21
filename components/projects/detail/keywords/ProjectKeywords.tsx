import React, { useState, useEffect } from 'react';
import { useAppSelector } from '@/redux/hooks';
import { selectSelectedProject } from '@/redux/features/projects/projectSelectors';
import StudioSelector from '@/components/common/StudioSelector';
import GrammarSection from '@/components/grammar/GrammarSection';

const ProjectKeywords: React.FC = () => {
  const selectedProject = useAppSelector(selectSelectedProject);
  const [selectedStudioId, setSelectedStudioId] = useState<number | null>(null);

  useEffect(() => {
    if (selectedProject && selectedProject.studios.length > 0) {
      setSelectedStudioId(selectedProject.studios[0].id);
    }
  }, [selectedProject]);

  return (
    <div className="max-w-screen-xl mx-auto mt-5">
      <div className="mb-4">
        <StudioSelector
          selectedStudioId={selectedStudioId}
          onStudioSelect={setSelectedStudioId}
        />
      </div>

      <div className='mt-5 grid grid-cols-1 gap-5'>
        {selectedStudioId !== null && <GrammarSection selectedStudioId={selectedStudioId} />}
      </div>
    </div>
  );
};

export default ProjectKeywords;