import React from 'react';
import ObjectiveSelector from '@/components/projects/objectives/ObjectiveSelector';
import GeneralEmotions from '@/components/emotions/GeneralEmotions';
import Card from '@/components/common/Card';
interface ProjectEmotionsProps {}

const ProjectEmotions: React.FC<ProjectEmotionsProps> = ({
}) => {
  return (
    <div className="max-w-screen-xl mx-auto mt-5">
      <div className='max-w-[500px]'>
        <ObjectiveSelector/>
      </div>
      <Card title="GeneralEmotions" className="mt-5">
        <GeneralEmotions/>
      </Card>
    </div>
  );
};

export default ProjectEmotions;