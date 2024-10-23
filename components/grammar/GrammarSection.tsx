import React, { useState, useMemo } from 'react';
import { useAppSelector } from '@/redux/hooks';
import { selectProjectGrammar, selectSelectedStudioIds } from '@/redux/features/projects/projectSelectors';
import { GrammarData, GrammarToken } from '@/types/grammar';
import { FiList, FiCloud, FiMaximize2, FiMinimize2 } from "react-icons/fi";
import Card from '@/components/common/Card';
import GrammarWordCloud from '@/components/grammar/GrammarWordCloud';

const categoryOrder = ['adj', 'noun', 'verb', 'other'] as const;

const categoryTitles: Record<typeof categoryOrder[number], string> = {
  adj: "Adjectives",
  noun: "Nouns",
  verb: "Verbs",
  other: "Other Words"
};

const GrammarSection: React.FC = () => {
  const selectedStudioIds = useAppSelector(selectSelectedStudioIds);
  const selectedStudioId = selectedStudioIds[0];
  const studioGrammar = useAppSelector(state => selectProjectGrammar(state, selectedStudioId));
  const [viewMode, setViewMode] = useState<'list' | 'cloud'>('cloud');
  const [showSpanish, setShowSpanish] = useState(false);
  const [fullscreenCategory, setFullscreenCategory] = useState<string | null>(null);

  const toggleViewMode = () => {
    setViewMode(prev => prev === 'list' ? 'cloud' : 'list');
  };

  const toggleLanguage = () => {
    setShowSpanish(prev => !prev);
  };

  const toggleFullscreen = (category: string) => {
    setFullscreenCategory(prev => prev === category ? null : category);
  };

  const renderGrammarList = (tokens: GrammarToken[], showSpanish: boolean) => (
    <ul className="list-disc pl-5 overflow-y-auto h-[300px]">
      {tokens.map((token, index) => (
        <li key={index} className="text-gray-700">
          {showSpanish ? token.translation : token.token} - {token.count}
        </li>
      ))}
    </ul>
  );

  const renderGrammarContent = useMemo(() => (
    studioGrammar?.map((grammarData: GrammarData) => (
      <div key={grammarData.studio_document} className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {categoryOrder.map((category) => (
          <Card 
            key={category} 
            title={categoryTitles[category]}
            className={`relative ${fullscreenCategory === category ? 'fullscreen-class' : ''}`}
          >
            <div className="absolute top-3 right-3 flex items-center gap-2">
              <button 
                onClick={() => toggleFullscreen(category)}
                className="text-sm text-gray-500 hover:text-gray-700"
              >
                {fullscreenCategory === category ? <FiMinimize2 className='w-6 h-6'/> : <FiMaximize2 className='w-6 h-6'/>}
              </button>
            </div>
            <div className="h-[300px] mt-10">
              {viewMode === 'list' 
                ? renderGrammarList(grammarData.categories[category], showSpanish)
                : <GrammarWordCloud 
                    height={300} 
                    tokens={grammarData.categories[category]} 
                    category={category}
                    showSpanish={showSpanish}
                  />
              }
            </div>
          </Card>
        ))}
      </div>
    ))
  ), [studioGrammar, viewMode, showSpanish, fullscreenCategory]);

  return (
    <div className="space-y-6">
      <div className="flex justify-end items-center gap-4 mb-4">
        <label className="themeSwitcherThree relative inline-flex cursor-pointer select-none items-center">
          <input
            type="checkbox"
            checked={showSpanish}
            onChange={toggleLanguage}
            className="sr-only"
          />
          <div className="shadow-card flex h-[30px] w-[50px] items-center justify-center rounded-md bg-white">
            <span
              className={`flex h-6 w-6 items-center justify-center rounded ${
                showSpanish ? 'bg-primary text-white' : 'text-body-color'
              }`}
            >
              🇪🇸
            </span>
            <span
              className={`flex h-6 w-6 items-center justify-center rounded ${
                !showSpanish ? 'bg-primary text-white' : 'text-body-color'
              }`}
            >
              🇬🇧
            </span>
          </div>
        </label>
        <button 
          className={`text-sm ${viewMode === 'list' ? 'text-blue-500' : 'text-gray-500'} hover:text-blue-700`}
          onClick={toggleViewMode}
        >
          {viewMode === 'list' ? <FiList className='w-6 h-6'/> : <FiCloud className='w-6 h-6'/>}
        </button>
      </div>
      {renderGrammarContent}
    </div>
  );
};

export default GrammarSection;
