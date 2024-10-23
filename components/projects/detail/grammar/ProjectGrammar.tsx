import React, { useEffect } from 'react';
import { useAppSelector, useAppDispatch } from '@/redux/hooks';
import { selectSelectedProject, selectSelectedStudioIds } from '@/redux/features/projects/projectSelectors';
import { setSelectedStudios } from '@/redux/features/projects/projectSlice';
import StudioSelector from '@/components/common/StudioSelector';
import GrammarSection from '@/components/grammar/GrammarSection';
import Spinner from '@/components/common/Spinner';

const ProjectGrammar: React.FC = () => {
  const dispatch = useAppDispatch();
  const selectedProject = useAppSelector(selectSelectedProject);
  const selectedStudioIds = useAppSelector(selectSelectedStudioIds);

  useEffect(() => {
    if (selectedProject && selectedProject.studios.length > 0 && selectedStudioIds.length === 0) {
      dispatch(setSelectedStudios([selectedProject.studios[0].id]));
    }
  }, [selectedProject, selectedStudioIds, dispatch]);

  if (!selectedProject) {
    return <Spinner />;
  }

  return (
    <div className="max-w-screen-xl mx-auto mt-5">
      <div className="mb-4">
        <StudioSelector showAllOption={false} />
      </div>

      <div className='mt-5 grid grid-cols-1 gap-5'>
        {selectedStudioIds.length > 0 ? (
          <GrammarSection />
        ) : (
          <div>Please select a studio to view grammar data.</div>
        )}
      </div>
    </div>
  );
};

export default ProjectGrammar;
