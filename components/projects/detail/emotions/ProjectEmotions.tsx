import React from 'react';
import ObjectiveSelector from '@/components/projects/objectives/ObjectiveSelector';

interface ProjectEmotionsProps {}

const ProjectEmotions: React.FC<ProjectEmotionsProps> = ({
}) => {
  return (
    <div className="max-w-screen-xl mx-auto mt-5">
      <div className='max-w-[500px]'>
        <ObjectiveSelector/>
      </div>
    </div>
  );
};

export default ProjectEmotions;