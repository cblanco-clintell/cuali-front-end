import React from 'react';

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

interface Keyword {
  name: string;
  sentiment: 'positive' | 'neutral' | 'negative';
  value: number; // Intensity or rating in percentage or number
}

interface KeywordsProps {
  keywords: Keyword[];
  selectedKeyword: string | null;
  onSelect: (keyword: string) => void;
}

const Keywords: React.FC<KeywordsProps> = ({ keywords, onSelect, selectedKeyword }) => {
  return (
    <div className="mt-3">
      <p className='text-slate-700 text-sm font-semibold'>Keywords</p>
      <div className="flex flex-wrap gap-2 mt-3">
        {keywords.map((keyword, index) => (
          <div
            key={index}
            onClick={() => onSelect(keyword.name)}
            className={`cursor-pointer px-3 py-2 rounded-lg flex justify-between items-center ${
              selectedKeyword === keyword.name ? 'bg-gray-100 border-zinc-300 ' : 'border-transparent '
            } border text-slate-700 text-xs font-medium`}
          >
            <span>{keyword.name}</span>
            <div className="flex items-center gap-1 ml-1">
              {/* Sentiment Dot */}
              <div className={`w-2 h-2 ${getSentimentColor(keyword.sentiment)} rounded-full`} />
              {/* Value */}
              {/* <div className="text-neutral-500 text-xs font-medium">{keyword.value}</div> */}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Keywords;