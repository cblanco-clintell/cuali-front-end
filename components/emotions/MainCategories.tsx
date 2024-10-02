import React, { useState } from 'react';
import Keywords from './Keywords';
import VerbatimList from './VerbatimList';

// Helper to get the color based on sentiment
const getSentimentColor = (sentiment: 'positive' | 'neutral' | 'negative') => {
  switch (sentiment) {
    case 'positive':
      return 'bg-lime-300'; // Positive sentiment
    case 'neutral':
      return 'bg-amber-300'; // Neutral sentiment
    case 'negative':
      return 'bg-red-300'; // Negative sentiment
    default:
      return 'bg-gray-300'; // Default gray
  }
};

// Placeholder categories and keywords data
const categories = [
  { id: 1, name: 'Camera Performance', sentiment: 'positive', value: 7.2 },
  { id: 2, name: 'Audio Experience', sentiment: 'negative', value: 5.3 },
  { id: 3, name: 'Design Aesthetics', sentiment: 'neutral', value: 6.8 },
  { id: 4, name: 'Charging Capabilities', sentiment: 'positive', value: 8.0 },
  { id: 5, name: 'Price Analytics', sentiment: 'neutral', value: 6.5 }
];

const keywordsData = {
  1: [
    { name: '4K', sentiment: 'positive', value: 8.0 },
    { name: 'HDR', sentiment: 'neutral', value: 6.5 },
    { name: 'Quality', sentiment: 'positive', value: 7.8 },
    { name: 'Nightography', sentiment: 'neutral', value: 5.9 }
  ],
  2: [
    { name: 'Bass', sentiment: 'positive', value: 7.0 },
    { name: 'Volume', sentiment: 'neutral', value: 6.3 },
    { name: 'Clarity', sentiment: 'negative', value: 4.5 }
  ],
  3: [
    { name: 'Build Quality', sentiment: 'positive', value: 9.0 },
    { name: 'Materials', sentiment: 'neutral', value: 6.2 },
    { name: 'Finish', sentiment: 'positive', value: 8.5 }
  ],
  // Add more data as necessary
};

const verbatimData = {
  '4K': [
    { group: 'Review Google Pixel 8', text: 'The 4K performance is top-notch, with excellent clarity.' },
    { group: 'Review iPhone 14', text: 'While 4K is supported, it lacks the finesse of higher-end models.' }
  ],
  'HDR': [
    { group: 'Review Samsung S23', text: 'HDR brings vivid details in bright and dark areas alike.' }
  ],
  'Nightography': [
    { group: 'Review Pixel 6', text: 'Nightography mode helps capture clear photos in low light.' }
  ],
};

const MainCategories: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);
  const [selectedKeyword, setSelectedKeyword] = useState<string | null>(null);

  return (
    <div className="bg-white rounded-xl flex gap-6">
      {/* Sidebar for Categories */}
      <div className="w-52 bg-gray-50 rounded-lg p-3">
        <p className="text-slate-700 text-sm font-semibold">Categories</p>
        <div className="mt-3">
          {categories.map((category) => (
            <div
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`cursor-pointer px-3 py-2 rounded-lg mb-4 flex justify-between items-center ${
                selectedCategory === category.id ? 'bg-gray-100 border-zinc-300' : 'border-transparent'
              } border text-slate-700 text-xs`}
            >
              <div>{category.name}</div>
              <div className="flex items-center gap-1">
                {/* Sentiment Dot */}
                <div className={`w-2 h-2 ${getSentimentColor(category.sentiment)} rounded-full`} />
                {/* Value */}
                <div className="text-neutral-500 text-xs font-medium">{category.value}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Content Area */}
      <div className="flex-grow">
        {selectedCategory ? (
          <>
            {/* Keywords Pills */}
            <Keywords
              keywords={keywordsData[selectedCategory] || []}
              onSelect={(keyword) => setSelectedKeyword(keyword)}
              selectedKeyword={selectedKeyword}
            />

            {/* Verbatim List */}
            {selectedKeyword && <VerbatimList verbatim={verbatimData[selectedKeyword]} />}
          </>
        ) : (
          <div className="text-gray-500">Please select a category from the sidebar.</div>
        )}
      </div>
    </div>
  );
};

export default MainCategories;