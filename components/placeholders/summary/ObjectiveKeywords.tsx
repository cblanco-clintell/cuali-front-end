import React, { useState } from 'react';
import { FiChevronDown, FiChevronUp } from "react-icons/fi";
import WordCloud from './WordCloud';
import WordBars from './WordBars';

// Define word categories (Adjectives, Verbs, Nouns) for General
const generalAdjectives = [
    { text: "Fast Charging", sentiment: "positive", value: 8.2 },
    { text: "Overheating", sentiment: "negative", value: 4.2 },
    { text: "Battery Duration", sentiment: "neutral", value: 3.5 },
    { text: "Standby Time", sentiment: "positive", value: 7.8 },
    { text: "Power Saving Mode", sentiment: "positive", value: 7.3 },
    { text: "Wireless Charging", sentiment: "positive", value: 6.0 },
    { text: "Charge Cycles", sentiment: "negative", value: 4.9 },
    { text: "Heat Dissipation", sentiment: "negative", value: 3.8 },
    { text: "Discharge Rate", sentiment: "neutral", value: 5.9 },
    { text: "Battery Health", sentiment: "positive", value: 7.6 },
    { text: "Charging Port", sentiment: "positive", value: 6.4 },
    { text: "Charger Compatibility", sentiment: "positive", value: 7.1 },
    { text: "Battery Swelling", sentiment: "negative", value: 3.4 },
    { text: "Fast Drain", sentiment: "negative", value: 4.5 },
    { text: "Battery Indicator", sentiment: "neutral", value: 6.2 },
];

const generalVerbs = generalAdjectives

const generalNouns = generalAdjectives

// Define word categories for different groups (right column)
const groupWordsMap = {
  "Group 1: Tech enthusiasts": {
    adjectives: generalAdjectives,
    verbs: generalAdjectives,
    nouns: generalAdjectives,
  },
  "Group 2: Casual users": {
    adjectives: generalAdjectives,
    verbs: generalAdjectives,
    nouns: generalAdjectives,
  },
  "Group 3: Professional videographers": {
    adjectives: generalAdjectives,
    verbs: generalAdjectives,
    nouns: generalAdjectives,
  },
};

const ToggleableWordDisplay = ({ words, viewMode }) => {
  return viewMode === "cloud" ? (
    <WordCloud height={300} words={words} />
  ) : (
    <WordBars words={words.map(word => ({ word: word.text, value: word.value * 10, sentiment: word.sentiment }))} />
  );
};

const ObjectiveKeywords: React.FC<{ objective: any, selectedGroup: string, setSelectedGroup: (group: string) => void }> = ({ objective, selectedGroup, setSelectedGroup }) => {
  const [isOpen, setIsOpen] = useState(true); // Toggle collapsible card
  const [viewMode, setViewMode] = useState("cloud"); // Global view mode selector

  // Ensure 'objective' is defined before accessing its properties
  if (!objective) {
    return <p>No objective data available.</p>;
  }

  // Get words based on selected group, or default to general
  const groupWords = groupWordsMap[selectedGroup] || {
    adjectives: generalAdjectives,
    verbs: generalVerbs,
    nouns: generalNouns,
  };

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
          {/* Global View Mode Selector */}
          <div className="mb-4">
            <label className="mr-2 text-sm font-semibold">View as:</label>
            <select
              value={viewMode}
              onChange={(e) => setViewMode(e.target.value)}
              className="p-1 border border-gray-300 rounded-md text-sm"
            >
              <option value="cloud">WordCloud</option>
              <option value="bars">WordBars</option>
            </select>
          </div>

          {/* Display the word categories based on the selected view mode */}
          <div className="grid grid-cols-3 gap-4">
            {/* Left Column: Adjectives */}
            <div>
              <div className="font-medium text-gray-900 text-sm mt-2">Adjectives</div>
              <ToggleableWordDisplay words={groupWords.adjectives} viewMode={viewMode} />
            </div>

            {/* Middle Column: Verbs */}
            <div>
              <div className="font-medium text-gray-900 text-sm mt-2">Verbs</div>
              <ToggleableWordDisplay words={groupWords.verbs} viewMode={viewMode} />
            </div>

            {/* Right Column: Nouns */}
            <div>
              <div className="font-medium text-gray-900 text-sm mt-2">Nouns</div>
              <ToggleableWordDisplay words={groupWords.nouns} viewMode={viewMode} />
            </div>
          </div>

          {/* Group Selector */}
          <div className="font-medium text-gray-900 mt-4">
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
        </div>
      )}
    </div>
  );
};

export default ObjectiveKeywords;
