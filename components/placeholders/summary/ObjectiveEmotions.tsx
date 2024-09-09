import React, { useState } from 'react';
import { FiChevronDown, FiChevronUp } from "react-icons/fi";
import WordCloud from './WordCloud';
import EmotionBar from './EmotionBar';

// Word set for General (left column)
const generalWords = [
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

// Word sets for different groups (right column)
const groupWordsMap = {
    "Group 1: Tech enthusiasts": [
        { text: 'Relaxed', value: 95, sentiment: 'positive' },
        { text: 'Focused', value: 85, sentiment: 'positive' },
        { text: 'Satisfied', value: 80, sentiment: 'positive' },
        { text: 'Relieved', value: 75, sentiment: 'neutral' },
        { text: 'Indifferent', value: 70, sentiment: 'neutral' },
        { text: 'Unmotivated', value: 65, sentiment: 'neutral' },
        { text: 'Uncertain', value: 60, sentiment: 'neutral' },
        { text: 'Frustrated', value: 55, sentiment: 'negative' },
        { text: 'Conflicted', value: 50, sentiment: 'negative' },
        { text: 'Irritated', value: 45, sentiment: 'negative' },
        { text: 'Disappointed', value: 40, sentiment: 'negative' },
        { text: 'Resentful', value: 35, sentiment: 'negative' },
        { text: 'Exhausted', value: 30, sentiment: 'negative' },
        { text: 'Confused', value: 25, sentiment: 'neutral' },
        { text: 'Bored', value: 20, sentiment: 'neutral' },
    ],
    "Group 2: Casual users": [
        { text: 'Optimistic', value: 95, sentiment: 'positive' },
        { text: 'Grateful', value: 90, sentiment: 'positive' },
        { text: 'Confident', value: 85, sentiment: 'positive' },
        { text: 'Engaged', value: 80, sentiment: 'positive' },
        { text: 'Indifferent', value: 85, sentiment: 'neutral' },
        { text: 'Calm', value: 80, sentiment: 'neutral' },
        { text: 'Unconcerned', value: 95, sentiment: 'neutral' },
        { text: 'Stressed', value: 60, sentiment: 'negative' },
        { text: 'Tense', value: 55, sentiment: 'negative' },
        { text: 'Irritable', value: 50, sentiment: 'negative' },
        { text: 'Displeased', value: 45, sentiment: 'negative' },
        { text: 'Lonely', value: 40, sentiment: 'negative' },
        { text: 'Downcast', value: 35, sentiment: 'negative' },
        { text: 'Puzzled', value: 30, sentiment: 'neutral' },
        { text: 'Detached', value: 25, sentiment: 'neutral' },
    ],
    "Group 3: Professional videographers": [
        { text: 'Elated', value: 100, sentiment: 'positive' },
        { text: 'Energized', value: 95, sentiment: 'positive' },
        { text: 'Inspired', value: 90, sentiment: 'positive' },
        { text: 'Satisfied', value: 85, sentiment: 'positive' },
        { text: 'Relaxed', value: 80, sentiment: 'positive' },
        { text: 'Content', value: 75, sentiment: 'positive' },
        { text: 'Pleased', value: 70, sentiment: 'positive' },
        { text: 'Calm', value: 65, sentiment: 'neutral' },
        { text: 'Unsure', value: 60, sentiment: 'neutral' },
        { text: 'Doubtful', value: 55, sentiment: 'neutral' },
        { text: 'Worried', value: 50, sentiment: 'negative' },
        { text: 'Anxious', value: 45, sentiment: 'negative' },
        { text: 'Upset', value: 40, sentiment: 'negative' },
        { text: 'Confused', value: 35, sentiment: 'neutral' },
        { text: 'Tired', value: 30, sentiment: 'neutral' },
    ],
};

const ObjectiveEmotions: React.FC<ObjectiveEmotionsProps> = ({ objective, selectedGroup, setSelectedGroup }) => {
  const [isOpen, setIsOpen] = useState(false); // Toggle collapsible card

  // Get words based on selected group
  const groupWords = groupWordsMap[selectedGroup] || generalWords;

  const toggleCollapse = () => setIsOpen(!isOpen);

  return (
    <div className="mb-4 border border-gray-300 rounded-lg shadow-sm">
      {/* Collapsible card title with caret */}
      <button
        onClick={toggleCollapse}
        className="w-full text-left text-gray-900 font-semibold py-4 flex items-center px-4"
      >
        {isOpen ? <FiChevronUp className="mr-2" /> : <FiChevronDown className="mr-2" />}
        <span>{objective.title}</span>
      </button>

      {/* Collapsible content */}
      {isOpen && (
        <div className="p-6 bg-white border-t border-gray-300">
          <div className="grid grid-cols-2 gap-4">
            {/* Left Column: General */}
            <div className="flex">
              <div className="flex-grow">
                <div className="font-medium text-gray-900 text-sm mt-2">General</div>
                <WordCloud height={500} words={generalWords} />
              </div>
              <div>

              <EmotionBar words={generalWords} />
            </div>

            {/* Right Column: Selected Group */}
            <div className="flex">
              <EmotionBar words={groupWords} /> {/* Emotion Bar on the left of the WordCloud */}
              <div className="flex-grow">
                <div className="font-medium text-gray-900">
                  <select
                    id="group-select"
                    value={selectedGroup}
                    onChange={(e) => setSelectedGroup(e.target.value)}
                    className="w-full p-2 mb-2 border rounded-md text-xs"
                  >
                    {objective.groupSpecific.map((group: any, index: number) => (
                      <option key={index} value={group.groupName}>
                        {group.groupName}
                      </option>
                    ))}
                  </select>
                </div>
                <WordCloud height={500} words={groupWords} />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ObjectiveEmotions;
