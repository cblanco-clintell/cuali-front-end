import React from 'react';
import ObjectiveSelector from '@/components/projects/objectives/ObjectiveSelector';
import GeneralEmotions from '@/components/emotions/GeneralEmotions';
import Card from '@/components/common/Card';
import WordCloud from '@/components/charts/WordCloud';
import EmotionPills from '@/components/emotions/EmotionPills';
import MainCategories from '@/components/emotions/MainCategories';
import StudioSelector from '@/components/common/StudioSelector';


interface ProjectEmotionsProps {}

const ProjectEmotions: React.FC<ProjectEmotionsProps> = ({
}) => {
  return (
    <div className="max-w-screen-xl mx-auto mt-5">
      <div className='grid grid-cols-2 gap-2'>
        <div className='mt-3'>
          <ObjectiveSelector/>
        </div>
        <div className='mt-3'>
          <StudioSelector showAllOption={true} />
        </div>
      </div>
      <Card title="General Emotions" className="mt-5">
        <GeneralEmotions/>
      </Card>
      <Card title="Main Emotions" className="mt-5">
        <EmotionPills/>
      </Card>
      <Card title="Main Categories" className="mt-5">
        <MainCategories/>
      </Card>
    </div>
  );
};

export default ProjectEmotions;
