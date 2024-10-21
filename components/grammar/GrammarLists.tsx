import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import { selectProjectGrammar } from '@/redux/features/projects/projectSelectors';
import { GrammarToken } from '@/types/grammar';

interface GrammarListProps {
  studioDocumentId?: number;
}

const GrammarLists: React.FC<GrammarListProps> = ({ studioDocumentId }) => {
  const grammar = useSelector((state: RootState) => selectProjectGrammar(state, studioDocumentId));

  if (!grammar || grammar.length === 0) {
    return <div>No grammar data available.</div>;
  }

  const renderList = (title: string, tokens: GrammarToken[]) => (
    <div>
      <h3>{title}</h3>
      <ul>
        {tokens.map((token, index) => (
          <li key={index}>
            {token.token} ({token.translation}) - Count: {token.count}
          </li>
        ))}
      </ul>
    </div>
  );

  return (
    <div>
      {grammar.map((grammarData) => (
        <div key={grammarData.studio_document}>
          <h2>Studio Document: {grammarData.studio_document}</h2>
          {renderList('Nouns', grammarData.categories.noun)}
          {renderList('Adjectives', grammarData.categories.adj)}
          {renderList('Verbs', grammarData.categories.verb)}
          {renderList('Others', grammarData.categories.other)}
        </div>
      ))}
    </div>
  );
};

export default GrammarLists;

