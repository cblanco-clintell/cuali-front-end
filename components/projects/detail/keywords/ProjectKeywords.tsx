import React, { useState } from 'react';
import ObjectiveSelector from '@/components/projects/objectives/ObjectiveSelector';
import Card from '@/components/common/Card';
import WordCloud from '@/components/charts/WordCloud';
import { FiMaximize2, FiList, FiCloud } from "react-icons/fi";
import Popup from '@/components/common/Popup';
import EmotionPills from '@/components/emotions/EmotionPills';
import { useAppSelector } from '@/redux/hooks';
import { 
  selectSelectedProject, 
  getStudios 
} from '@/redux/features/projects/projectSelectors';
import { Keyword } from '@/types/keywords';
import { selectSelectedKeywords } from '@/redux/features/projects/projectSelectors';

const getSentimentColor = (sentiment: 'positive' | 'neutral' | 'negative') => {
  switch (sentiment) {
    case 'positive':
      return 'bg-lime-300'; // Positive emotions in lime color
    case 'neutral':
      return 'bg-amber-300'; // Neutral emotions in amber color
    case 'negative':
      return 'bg-red-300'; // Negative emotions in red color
    default:
      return 'bg-gray-300';
  }
};

// interface Word {
//   text: string;
//   value: number;
//   sentiment: string;
// }

// const generalWords: Word[] = [
//   { text: 'Happy', value: 100, sentiment: 'positive' },
//   { text: 'Joyful', value: 90, sentiment: 'positive' },
//   { text: 'Excited', value: 85, sentiment: 'positive' },
//   { text: 'Content', value: 80, sentiment: 'positive' },
//   { text: 'Calm', value: 75, sentiment: 'neutral' },
//   { text: 'Neutral', value: 70, sentiment: 'neutral' },
//   { text: 'Uncertain', value: 65, sentiment: 'neutral' },
//   { text: 'Worried', value: 60, sentiment: 'negative' },
//   { text: 'Anxious', value: 55, sentiment: 'negative' },
//   { text: 'Frustrated', value: 50, sentiment: 'negative' },
//   { text: 'Angry', value: 45, sentiment: 'negative' },
//   { text: 'Sad', value: 40, sentiment: 'negative' },
//   { text: 'Depressed', value: 35, sentiment: 'negative' },
//   { text: 'Tired', value: 30, sentiment: 'neutral' },
//   { text: 'Confused', value: 25, sentiment: 'neutral' },
// ];

const DynamicSection = () => {

  const selectedKeywords = useAppSelector(selectSelectedKeywords);

  
  const [isWordCloud, setIsWordCloud] = useState(true);
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const toggleView = () => {
    setIsWordCloud(!isWordCloud);
  };

  const handleFullScreen = () => {
    setIsPopupOpen(true);
  };

  const closePopup = () => {
    setIsPopupOpen(false);
  };

  const renderContent = () => (
    isWordCloud ? (
      <WordCloud height={400} words={selectedKeywords} />
    ) : (
      <ul className="list-disc pl-5">
        {selectedKeywords.map((keyword, index) => (
          <li key={index} className="text-gray-900 list-none">
            {/* {keyword.keyword} {keyword.valence} {keyword.sentiment} */}
            <div key={index} className="px-3 py-2 rounded-lg border border-zinc-300 justify-start items-center gap-2 flex">
            <div className="rounded-lg justify-center items-center gap-2 flex">
              <div className="text-slate-700 text-xs font-medium font-['DM Sans'] leading-none">{keyword.keyword}</div>
            </div>
            <div className="justify-start items-center gap-1 flex">
              <div className={`w-2 h-2 ${getSentimentColor(keyword.valence)} rounded-full`} />
              <div className="text-neutral-500 text-xs font-medium font-['DM Sans'] leading-none">{keyword.sentiment}</div>
              </div>
            </div>
          </li>
        ))}
      </ul>
    )
  );

  return (
    <>
      <section className="relative flex flex-col gap-3 self-stretch p-3 bg-gray-50 rounded-lg border">
        {/* Title and Control Buttons */}
        <div className="flex justify-between items-center">
          <h2 className="font-semibold text-gray-900 text-sm">Keywords</h2>
          <div className="flex gap-2">
            <button 
              className="text-sm text-gray-500 hover:text-gray-700"
              onClick={toggleView}
            >
              {isWordCloud ? <FiList className='w-6 h-6'/> : <FiCloud className='w-6 h-6'/>}
            </button>
            <button 
              className="text-sm text-gray-500 hover:text-gray-700"
              onClick={handleFullScreen}
            >
              <FiMaximize2 className='w-6 h-6'/>
            </button>
          </div>
        </div>

        {/* Dynamic Content */}
        {renderContent()}
      </section>

      {/* Popup for Fullscreen View */}
      {isPopupOpen && (
        <Popup onClose={closePopup} extraClasses="w-[80vw] h-[80vh]">
          <h2 className="font-semibold text-gray-900 text-sm">Keywords</h2>
          {renderContent()}
        </Popup>
      )}
    </>
  );
};

const ProjectKeywords: React.FC = () => {
  return (
    <div className="max-w-screen-xl mx-auto mt-5">
      <div className=''>
        <ObjectiveSelector />
      </div>

      <Card title="Main Emotions" className="mt-5">
        <EmotionPills/>
      </Card>

      <div className='mt-5 grid grid-cols-1 gap-5'>
        <DynamicSection />
        {/* <DynamicSection title="Nouns" words={generalWords} />
        <DynamicSection title="Verbs" words={generalWords} /> */}
      </div>
    </div>
  );
};

export default ProjectKeywords;