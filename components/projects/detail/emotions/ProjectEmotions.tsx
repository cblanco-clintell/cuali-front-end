import React from 'react';
import ObjectiveSelector from '@/components/projects/objectives/ObjectiveSelector';
import GeneralEmotions from '@/components/emotions/GeneralEmotions';
import Card from '@/components/common/Card';
import WordCloud from '@/components/charts/WordCloud';
import EmotionPills from '@/components/emotions/EmotionPills';
import MainCategories from '@/components/emotions/MainCategories';


interface ProjectEmotionsProps {}

const generalWords: Word[] = [
  { text: 'Happy', value: 100, sentiment: 'positive' },
  { text: 'Joyful', value: 90, sentiment: 'positive' },
  { text: 'Excited', value: 85, sentiment: 'positive' },
  { text: 'Content', value: 80, sentiment: 'positive' },
  { text: 'Calm', value: 75, sentiment: 'neutral' },
  { text: 'Neutral', value: 70, sentiment: 'neutral' },
  { text: 'Uncertain', value: 65, sentiment: 'neutral' },
  { text: 'Worried', value: 60, sentiment: 'negative' },
  { text: 'Anxious', value: 55, sentiment: 'negative' },
  { text: 'Frustrated', value: 50, sentiment: 'negative' },
  { text: 'Angry', value: 45, sentiment: 'negative' },
  { text: 'Sad', value: 40, sentiment: 'negative' },
  { text: 'Depressed', value: 35, sentiment: 'negative' },
  { text: 'Tired', value: 30, sentiment: 'neutral' },
  { text: 'Confused', value: 25, sentiment: 'neutral' },
];

const ProjectEmotions: React.FC<ProjectEmotionsProps> = ({
}) => {
  return (
    <div className="max-w-screen-xl mx-auto mt-5">
      <div className='max-w-[500px]'>
        <ObjectiveSelector/>
      </div>
      <Card title="General Emotions" className="mt-5">
        <GeneralEmotions/>
      </Card>
      <Card title="Main Emotions" className="mt-5">
        <EmotionPills emotions={generalWords}/>
      </Card>
      <Card title="Main Categories" className="mt-5">
        <MainCategories/>
      </Card>
    </div>
  );
};

export default ProjectEmotions;