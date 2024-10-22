import React, { useState, useEffect } from 'react';
import Keywords from './Keywords';
import VerbatimList from './VerbatimList';
import { useSelector } from 'react-redux';
import { selectKeywordCategories } from '@/redux/features/projects/projectSelectors';
import { Category } from '@/types/categories';
import { Keyword } from '@/types/keywords';

const MainCategories: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);
  const [selectedKeywords, setSelectedKeywords] = useState<Keyword[]>([]);
  const categories = useSelector(selectKeywordCategories);

  useEffect(() => {
    if (categories && categories.length > 0 && !selectedCategory) {
      setSelectedCategory(categories[0]);
    }
  }, [categories, selectedCategory]);

  const handleCategorySelect = (category: Category) => {
    if (selectedCategory?.name !== category.name) {
      setSelectedKeywords([]);
      setSelectedCategory(category);
    }
  };

  const handleKeywordSelect = (keyword: Keyword) => {
    if (selectedKeywords.find(k => k.keyword === keyword.keyword)) {
      setSelectedKeywords(selectedKeywords.filter(k => k.keyword !== keyword.keyword));
    } else {
      setSelectedKeywords([...selectedKeywords, keyword]);
    }
  };

  return (
    <div className="bg-white rounded-xl flex gap-6">
      <div className="w-[250px] min-w-[250px] max-w-[250px] bg-gray-50 rounded-lg p-3">
        <p className="text-slate-700 text-sm font-semibold">Categories</p>
        <div className="mt-3">
          {categories.map((category: Category) => (
            <div
              key={category.name}
              onClick={() => handleCategorySelect(category)}
              className={`cursor-pointer px-3 py-2 rounded-lg mb-0 flex justify-between items-center ${
                selectedCategory?.name === category.name ? 'bg-gray-100 border-zinc-300' : 'border-transparent'
              } border text-slate-700 text-xs`}
            >
              <div>{category.name}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="flex-grow min-h-full">
        {selectedCategory ? (
          <>
            <Keywords
              category={selectedCategory}
              onSelect={handleKeywordSelect}
              selectedKeywords={selectedKeywords}
            />

            {selectedKeywords.length > 0 && <VerbatimList keywords={selectedKeywords} />}
          </>
        ) : (
          <div className="text-gray-500">No categories with keywords available.</div>
        )}
      </div>
    </div>
  );
};

export default MainCategories;
