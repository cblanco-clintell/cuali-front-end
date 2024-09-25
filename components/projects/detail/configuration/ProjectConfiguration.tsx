import React from 'react';
import { useAppDispatch, useAppSelector,  } from '@/redux/hooks';
import { selectSelectedProject,  } from '@/redux/features/projects/projectSelectors';
import { formatDate } from '@/utils/formatDate';

interface ProjectConfigurationProps {}

const ProjectConfiguration: React.FC<ProjectConfigurationProps> = ({}) => {
  const selectedProject = useAppSelector(selectSelectedProject);

  return (
    <div className="max-w-screen-xl mx-auto mt-5 gap-4">
      <p className='font-bold'>Brief</p>
      <p>{selectedProject?.briefing}</p>
      <p className='font-bold'>Objectives</p>
      <ol>
        {selectedProject?.objectives?.map((objective, index) => (
          <li key={index}>{objective}</li>
        ))}
      </ol>
      <p className='font-bold'>Created</p>
      <p>{formatDate(selectedProject?.created)}</p>
      <p className='font-bold'>Status</p>
      <p>{selectedProject?.status}</p>

    </div>
  );
};

export default ProjectConfiguration;