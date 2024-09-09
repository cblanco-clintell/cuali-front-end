import React from 'react';

// Sample data
const wordsData = [
  { word: "Performance", value: 80, sentiment: "positive" },
  { word: "Battery", value: 65, sentiment: "neutral" },
  { word: "Price", value: 40, sentiment: "negative" },
  { word: "Design", value: 55, sentiment: "positive" },
  { word: "Camera", value: 75, sentiment: "positive" },
];

// Sentiment color map
const sentimentColors = {
  positive: "#4CAF50", // Green
  neutral: "#FFC107",  // Yellow
  negative: "#F44336", // Red
};

// WordBar Component
const WordBars = ({ words }) => {
  // Sort words by value in descending order
  const sortedWords = [...words].sort((a, b) => b.value - a.value);

  return (
    <div className="w-full max-w-md mx-auto">
      {sortedWords.map((wordEntry) => (
        <div key={wordEntry.word} className="flex items-center mb-2">
          {/* Word text */}
          <div className="w-1/4 text-xs font-medium text-gray-700">{wordEntry.word}</div>

          {/* Horizontal bar */}
          <div className="flex-1 mx-2 bg-gray-200">
            <div
              className="h-3"  // Smaller height for the bar
              style={{
                width: `${wordEntry.value}%`,
                backgroundColor: sentimentColors[wordEntry.sentiment],
                borderRadius: '0px', // Squared corners
              }}
            />
          </div>

          {/* Value */}
          <div className="w-8 text-xs font-medium text-gray-500">{wordEntry.value}</div>
        </div>
      ))}
    </div>
  );
};

export default WordBars;
