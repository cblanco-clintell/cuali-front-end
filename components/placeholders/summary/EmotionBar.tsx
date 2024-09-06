import React from 'react';
import { WordData } from './WordCloud'; // Reuse the WordData interface

interface EmotionBarProps {
  words: WordData[];
}

// Function to calculate sentiment percentages based on word values
const calculateSentiments = (words: WordData[]) => {
  const totalValue = words.reduce((sum, word) => sum + word.value, 0);

  const sentimentValue = {
    positive: words
      .filter((word) => word.sentiment === 'positive')
      .reduce((sum, word) => sum + word.value, 0),
    neutral: words
      .filter((word) => word.sentiment === 'neutral')
      .reduce((sum, word) => sum + word.value, 0),
    negative: words
      .filter((word) => word.sentiment === 'negative')
      .reduce((sum, word) => sum + word.value, 0),
  };

  return {
    positive: (sentimentValue.positive / totalValue) * 100,
    neutral: (sentimentValue.neutral / totalValue) * 100,
    negative: (sentimentValue.negative / totalValue) * 100,
  };
};

const EmotionBar: React.FC<EmotionBarProps> = ({ words }) => {
  const sentiments = calculateSentiments(words);

  return (
    <div className="relative h-full w-4 flex flex-col pt-14">
      {/* Positive sentiment */}
      <div className="relative bg-green-400" style={{ height: `${sentiments.positive}%` }}>
        {sentiments.positive > 5 && (
          <span
            className="absolute w-full left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 rotate-[270deg] text-black font-bold text-xs"
            title={`${sentiments.positive.toFixed(1)}% Positive`}
          >
            {sentiments.positive.toFixed(1)}%
          </span>
        )}
      </div>

      {/* Neutral sentiment */}
      <div className="relative bg-yellow-400" style={{ height: `${sentiments.neutral}%` }}>
        {sentiments.neutral > 5 && (
          <span
            className="absolute w-full left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 rotate-[270deg] text-black font-bold text-xs"
            title={`${sentiments.neutral.toFixed(1)}% Neutral`}
          >
            {sentiments.neutral.toFixed(1)}%
          </span>
        )}
      </div>

      {/* Negative sentiment */}
      <div className="relative bg-red-400" style={{ height: `${sentiments.negative}%` }}>
        {sentiments.negative > 5 && (
          <span
            className="absolute w-full left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 rotate-[270deg] text-black font-bold text-xs"
            title={`${sentiments.negative.toFixed(1)}% Negative`}
          >
            {sentiments.negative.toFixed(1)}%
          </span>
        )}
      </div>
    </div>
  );
};

export default EmotionBar;
