import { Category } from '@/types/categories';
import React from 'react';
import { useAppSelector } from '@/redux/hooks';
import { selectCategoryKeywords } from '@/redux/features/projects/projectSelectors'; // Using category-specific keywords
import { Keyword } from '@/types/keywords';

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

interface KeywordsProps {
  category: Category;
  selectedKeywords: Keyword[]; // Handle multiple selected keywords
  onSelect: (keyword: Keyword) => void; // Pass full Keyword object
}

const Keywords: React.FC<KeywordsProps> = ({ category, onSelect, selectedKeywords }) => {
  // Fetch keywords specific to the category
  const categoryKeywords = useAppSelector((state) => selectCategoryKeywords(state, category));

  // Helper to check if a keyword is selected
  const isSelected = (keyword: Keyword) => {
    return selectedKeywords.some(selected => selected.keyword === keyword.keyword);
  };

  return (
    <div className="mt-3">
      <p className='text-slate-700 text-sm font-semibold'>Keywords</p>
      <div className="flex flex-wrap gap-2 mt-3">
        {categoryKeywords?.map((keyword: Keyword, index: number) => (
          <div
            key={index}
            onClick={() => onSelect(keyword)} // Pass the full Keyword object
            className={`cursor-pointer px-3 py-2 rounded-lg flex justify-between items-center ${
              isSelected(keyword) ? 'bg-gray-100 border-zinc-300' : 'border-transparent'
            } border text-slate-700 text-xs font-medium`}
          >
            <span>{keyword.keyword}</span>
            <div className="flex items-center gap-1 ml-1">
              {/* Sentiment Dot */}
              <div className={`w-2 h-2 ${getSentimentColor(keyword.valence)} rounded-full`} />
              {/* Sentiment Value */}
              <div className="text-neutral-500 text-xs font-medium">{keyword.sentiment}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Keywords;