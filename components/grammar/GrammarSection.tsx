import React, { useState, useMemo } from 'react';
import { useAppSelector } from '@/redux/hooks';
import { selectProjectGrammar } from '@/redux/features/projects/projectSelectors';
import { GrammarData, GrammarToken } from '@/types/grammar';
import { FiMaximize2 } from "react-icons/fi";
import Popup from '@/components/common/Popup';

interface GrammarSectionProps {
  selectedStudioId: number;
}

const GrammarSection: React.FC<GrammarSectionProps> = ({ selectedStudioId }) => {
  const studioGrammar = useAppSelector(state => selectProjectGrammar(state, selectedStudioId));
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const handleFullScreen = () => {
    setIsPopupOpen(true);
  };

  const closePopup = () => {
    setIsPopupOpen(false);
  };

  const renderGrammarList = (title: string, tokens: GrammarToken[]) => (
    <div className="mb-4">
      <h3 className="font-semibold text-gray-800 mb-2">{title}</h3>
      <ul className="list-disc pl-5">
        {tokens.map((token, index) => (
          <li key={index} className="text-gray-700">
            {token.token} ({token.translation}) - Count: {token.count}
          </li>
        ))}
      </ul>
    </div>
  );

  const renderGrammarContent = useMemo(() => (
    <div>
      {studioGrammar?.map((grammarData: GrammarData) => (
        <div key={grammarData.studio_document} className="mb-6">
          {/* <h2 className="font-bold text-gray-900 mb-3">Studio Document: {grammarData.studio_document}</h2> */}
          {renderGrammarList('Nouns', grammarData.categories.noun)}
          {renderGrammarList('Adjectives', grammarData.categories.adj)}
          {renderGrammarList('Verbs', grammarData.categories.verb)}
          {renderGrammarList('Others', grammarData.categories.other)}
        </div>
      ))}
    </div>
  ), [studioGrammar]);

  return (
    <>
      <section className="relative flex flex-col gap-3 self-stretch p-3 bg-gray-50 rounded-lg border">
        <div className="flex justify-between items-center">
          <h2 className="font-semibold text-gray-900 text-sm">Grammar</h2>
          <button 
            className="text-sm text-gray-500 hover:text-gray-700"
            onClick={handleFullScreen}
          >
            <FiMaximize2 className='w-6 h-6'/>
          </button>
        </div>
        {renderGrammarContent}
      </section>

      {isPopupOpen && (
        <Popup onClose={closePopup} extraClasses="w-[80vw] h-[80vh] overflow-y-auto">
          <h2 className="font-semibold text-gray-900 text-lg mb-4">Grammar</h2>
          {renderGrammarContent}
        </Popup>
      )}
    </>
  );
};

export default GrammarSection;