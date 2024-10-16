import React from 'react';
import { useAppSelector } from '@/redux/hooks';
import { selectSelectedProject, getStudios } from '@/redux/features/projects/projectSelectors';
import StudioCardList from '@/components/configuration/StudioCardList';
import ProjectGeneralInfo from '@/components/configuration/ProjectGeneralInfo';

const ProjectConfiguration: React.FC = () => {
  const studios = useAppSelector(getStudios);

  const handleUpload = (studioId: number, file: File) => {
    console.log(`Uploading file ${file.name} to studio ${studioId}`);
  };

  return (
    <div className="max-w-screen-2xl mx-auto mt-5">
      <h3 className="text-base font-semibold leading-7 text-gray-900">Study Configuration</h3>
      <p className="mt-1 max-w-2xl text-sm leading-6 text-gray-500">General information and objectives of the study.</p>
      <div className='grid grid-cols-3 gap-4'>
        <div className='col-span-2'>
          <ProjectGeneralInfo/>
        </div>
        <div className='col-span-1'>
          <StudioCardList studios={studios || []} onUpload={handleUpload} />
        </div>
      </div>
    </div>
  );
};

export default ProjectConfiguration;