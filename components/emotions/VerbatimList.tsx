import React, { useState } from 'react';
import { useAppSelector } from '@/redux/hooks';
import { selectKeywordSegments } from '@/redux/features/projects/projectSelectors';
import { Keyword } from '@/types/keywords';
import { Segment } from '@/types/segments';
import { ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/24/solid';
import VerbatimListItem from './VerbatimListItem';
import Transcript from './Transcript';

interface VerbatimListProps {
  keywords: Keyword[];
}

const VerbatimList: React.FC<VerbatimListProps> = ({ keywords }) => {
  const keywordsWithSegments = useAppSelector(state => selectKeywordSegments(state, keywords));
  const [expandedKeywords, setExpandedKeywords] = useState<Set<string>>(new Set());
  const [selectedSegment, setSelectedSegment] = useState<Segment | null>(null);

  const toggleKeyword = (keyword: string) => {
    setExpandedKeywords(prev => {
      const newSet = new Set(prev);
      if (newSet.has(keyword)) {
        newSet.delete(keyword);
      } else {
        newSet.add(keyword);
      }
      return newSet;
    });
  };

  const handleSegmentClick = (segment: Segment) => {
    setSelectedSegment(segment);
  };

  return (
    <div className="mt-5 relative">
      <h3 className="text-gray-900 font-semibold text-sm">Verbatim</h3>
      <div className="mt-3">
        {keywordsWithSegments.length > 0 ? (
          keywordsWithSegments.map((keywordWithSegments) => (
            <div key={keywordWithSegments.keyword} className="mb-4">
              <button
                onClick={() => toggleKeyword(keywordWithSegments.keyword)}
                className="flex justify-between items-center w-full text-left text-gray-800 font-medium text-sm p-3 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
              >
                <span>{keywordWithSegments.keyword}</span>
                {expandedKeywords.has(keywordWithSegments.keyword) ? (
                  <ChevronUpIcon className="h-5 w-5 text-gray-600" />
                ) : (
                  <ChevronDownIcon className="h-5 w-5 text-gray-600" />
                )}
              </button>
              {expandedKeywords.has(keywordWithSegments.keyword) && (
                <div className="mt-2 space-y-2">
                  {keywordWithSegments.segments.map((segment, index) => (
                    <VerbatimListItem 
                      key={index} 
                      segment={segment} 
                      onClick={() => handleSegmentClick(segment)}
                    />
                  ))}
                </div>
              )}
            </div>
          ))
        ) : (
          <div className="text-gray-500">No matching verbatim found.</div>
        )}
      </div>
      {selectedSegment && (
        <Transcript 
          studioDocumentId={selectedSegment.studio_document ?? 0}
          selectedSegmentId={selectedSegment.id}
          onClose={() => setSelectedSegment(null)}
        />
      )}
    </div>
  );
};

export default VerbatimList;