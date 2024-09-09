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
    // Add other groups as needed
};

const ObjectiveEmotions: React.FC<ObjectiveEmotionsProps> = ({ objective, selectedGroup, setSelectedGroup }) => {
  const [isOpen, setIsOpen] = useState(false); // Toggle collapsible card
  const [showGeneral, setShowGeneral] = useState(true);  // Toggle for showing General
  const [showGroup, setShowGroup] = useState(true);      // Toggle for showing Group

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
          {/* Toggle Buttons to Hide/Show Columns */}
          <div className="flex justify-between pb-4">
            <button
              className={`px-3 py-1 border ${showGeneral ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
              onClick={() => setShowGeneral(!showGeneral)}
            >
              {showGeneral ? 'Hide General' : 'Show General'}
            </button>
            <button
              className={`px-3 py-1 border ${showGroup ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
              onClick={() => setShowGroup(!showGroup)}
            >
              {showGroup ? 'Hide Group' : 'Show Group'}
            </button>
          </div>

          <div className={`grid grid-cols-${showGeneral && showGroup ? 2 : 1} gap-4`}>
            {/* Left Column: General */}
            {showGeneral && (
              <div className="flex">
                <div className="flex-grow">
                  <div className="font-medium text-gray-900 text-sm mt-2">General</div>
                  <WordCloud height={500} words={generalWords} />
                </div>
                <EmotionBar words={generalWords} />
              </div>
            )}

            {/* Right Column: Selected Group */}
            {showGroup && (
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
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default ObjectiveEmotions;
