import React, { useState } from 'react';
import ObjectiveSelector from '@/components/projects/objectives/ObjectiveSelector';
import Card from '@/components/common/Card';
import WordCloud from '@/components/charts/WordCloud';
import { FiMaximize2, FiList, FiCloud } from "react-icons/fi";
import Popup from '@/components/common/Popup';
import EmotionPills from '@/components/emotions/EmotionPills';

interface Word {
  text: string;
  value: number;
  sentiment: string;
}

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

const DynamicSection = ({ title, words }: { title: string; words: Word[] }) => {
  const [isWordCloud, setIsWordCloud] = useState(true);
  const [isPopupOpen, setIsPopupOpen] = useState(false); // State to handle popup visibility

  const toggleView = () => {
    setIsWordCloud(!isWordCloud);
  };

  const handleFullScreen = () => {
    setIsPopupOpen(true); // Show popup when fullscreen button is clicked
  };

  const closePopup = () => {
    setIsPopupOpen(false); // Close popup
  };

  const renderContent = () => (
    isWordCloud ? (
      <WordCloud height={400} words={words} />
    ) : (
      <ul className="list-disc pl-5">
        {words.map((word, index) => (
          <li key={index} className="text-gray-900">
            {word.text}
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
          <h2 className="font-semibold text-gray-900 text-sm">{title}</h2>
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
          <h2 className="font-semibold text-gray-900 text-sm">{title}</h2>
          {renderContent()}
        </Popup>
      )}
    </>
  );
};

const ProjectKeywords: React.FC = () => {
  return (
    <div className="max-w-screen-xl mx-auto mt-5">
      <div className='max-w-[500px]'>
        <ObjectiveSelector />
      </div>

      <Card title="Main Emotions" className="mt-5">
        <EmotionPills emotions={generalWords}/>
      </Card>

      <div className='mt-5 grid grid-cols-3 gap-5'>
        <DynamicSection title="Adjectives" words={generalWords} />
        <DynamicSection title="Nouns" words={generalWords} />
        <DynamicSection title="Verbs" words={generalWords} />
      </div>
    </div>
  );
};

export default ProjectKeywords;