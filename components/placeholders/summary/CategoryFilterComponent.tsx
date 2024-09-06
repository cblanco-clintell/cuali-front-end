import React, { useState, useEffect } from 'react';
import { conversationExcerpts, categories } from '@/data';

// Helper function to get sentiment color for the border and checkbox
const getSentimentColor = (sentiment: string) => {
  switch (sentiment) {
    case 'positive':
      return 'border-[#9AE17B] text-[#9AE17B]'; // Light green for positive
    case 'neutral':
      return 'border-[#FFC55B] text-[#FFC55B]'; // Yellow for neutral
    case 'negative':
      return 'border-[#E8704E] text-[#E8704E]'; // Red for negative
    default:
      return 'border-gray-400 text-gray-400';  // Default to gray for unknown sentiment
  }
};

// Keyword selection toggle logic
const toggleKeywordSelection = (
  keyword: string,
  selectedKeywords: string[],
  setSelectedKeywords: (kw: string[]) => void
) => {
  if (selectedKeywords.includes(keyword)) {
    setSelectedKeywords(selectedKeywords.filter((k) => k !== keyword));
  } else {
    setSelectedKeywords([...selectedKeywords, keyword]);
  }
};

// Filter conversation excerpts based on selected keywords
const filterExcerptsByKeywords = (selectedKeywords: string[]) => {
  if (selectedKeywords.length === 0) return conversationExcerpts;
  return conversationExcerpts.filter((excerpt) =>
    excerpt.keywords.some((keyword) => selectedKeywords.includes(keyword))
  );
};

const CategoryFilterComponent: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState(categories[0]);
  const [selectedKeywords, setSelectedKeywords] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState<'sentiment' | 'value'>('sentiment');

  useEffect(() => {
    // Initialize all keywords as selected by default
    const initialKeywords = selectedCategory.keywords.map((keyword) => keyword.name);
    setSelectedKeywords(initialKeywords);
  }, [selectedCategory]);

  const filteredExcerpts = filterExcerptsByKeywords(selectedKeywords);

  // Sorting logic for keywords
  const sortedKeywords = [...selectedCategory.keywords].sort((a, b) => {
    if (sortBy === 'sentiment') {
      const sentimentOrder = { positive: 1, neutral: 2, negative: 3 };
      if (sentimentOrder[a.sentiment] === sentimentOrder[b.sentiment]) {
        return b.value - a.value; // Same sentiment, sort by value
      }
      return sentimentOrder[a.sentiment] - sentimentOrder[b.sentiment]; // Sort by sentiment
    } else {
      // Sort by value first, positive keywords come first
      if (a.sentiment === b.sentiment) {
        return b.value - a.value; // If same sentiment, sort by value
      }
      // Positive sentiment comes first
      return a.sentiment === 'positive' ? -1 : b.sentiment === 'positive' ? 1 : b.value - a.value;
    }
  });

  return (
    <div className="flex h-full">
      {/* Left Column - Categories */}
      <div className="w-1/6 p-4 bg-gray-50 rounded-lg overflow-auto">
        <h2 className="text-gray-900 font-semibold text-base">Categories</h2>
        <ul className="space-y-2">
          {categories.map((category) => (
            <li
              key={category.name}
              className="flex items-center justify-between bg-gray-100 p-2 rounded-lg cursor-pointer"
              onClick={() => setSelectedCategory(category)}
            >
              <span className="font-medium text-sm">{category.name}</span>
              <div className="flex items-center">
                <span className="mr-2 text-xs font-bold">{category.value}</span>
                <span className={`w-3 h-3 rounded-full ${getSentimentColor(category.sentiment)}`} />
              </div>
            </li>
          ))}
        </ul>
      </div>

      {/* Right Column - Keywords and Conversation Excerpts */}
      <div className="w-5/6 p-4 bg-white rounded-lg flex flex-col gap-4">
        {selectedCategory ? (
          <>
            {/* Sort Options */}
            <div className="flex justify-between">
              <h2 className="text-gray-900 font-semibold text-base">{selectedCategory.name} Keywords</h2>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as 'sentiment' | 'value')}
                className="p-2 border rounded-md text-sm"
              >
                <option value="sentiment">Sort by Sentiment</option>
                <option value="value">Sort by Value</option>
              </select>
            </div>

            {/* Keywords Section */}
            <div className="flex flex-wrap gap-2">
              {sortedKeywords.map((keyword) => (
                <div
                  key={keyword.name}
                  className={`px-3 py-2 rounded-full cursor-pointer bg-white border-2 ${getSentimentColor(
                    keyword.sentiment
                  )} flex items-center`}
                >
                  <input
                    type="checkbox"
                    checked={selectedKeywords.includes(keyword.name)}
                    onChange={() => toggleKeywordSelection(keyword.name, selectedKeywords, setSelectedKeywords)}
                    className={`mr-2 form-checkbox h-4 w-4 ${getSentimentColor(keyword.sentiment)}`}
                  />
                  <span className="text-gray-800 font-medium text-xs">{keyword.name}</span>
                  <span className="ml-2 text-xs font-light text-gray-500">{keyword.value}</span>
                </div>
              ))}
            </div>

            {/* Conversation Excerpts Section */}
            <div className="min-h-[320px]">
              <h2 className="text-gray-900 font-semibold text-base">Conversation Excerpts</h2>
              {filteredExcerpts.length > 0 ? (
                filteredExcerpts.map((excerpt) => (
                  <div key={excerpt.id} className="p-4 mb-3 bg-gray-100 rounded-xl">
                    <div className="flex justify-between">
                      <span className="text-xs font-semibold text-neutral-500 bg-gray-200 px-2 py-1 rounded-full">
                        {excerpt.group}
                      </span>
                    </div>
                    <p className="text-sm text-gray-800 mt-2">{excerpt.text}</p>
                  </div>
                ))
              ) : (
                <p className="text-gray-600">No excerpts found for the selected keywords.</p>
              )}
            </div>
          </>
        ) : (
          <p className="text-gray-600">Select a category to view its keywords and related conversation excerpts.</p>
        )}
      </div>
    </div>
  );
};

export default CategoryFilterComponent;
