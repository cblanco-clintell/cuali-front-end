import React from 'react';
import { useAppSelector } from '@/redux/hooks';
import { selectOrganizedSegments } from '@/redux/features/projects/projectSelectors';

interface SpeakerKeywordsProps {
  selectedStudioId: number | null;
  renamedSpeakers: Record<string, string>;
}

const SpeakerKeywords: React.FC<SpeakerKeywordsProps> = ({ selectedStudioId, renamedSpeakers }) => {
  const organizedSegments = useAppSelector(selectOrganizedSegments);

  const filteredSegments = selectedStudioId
    ? organizedSegments[selectedStudioId]?.documents || {}
    : {};

  const getSpeakerKeywords = (documentData: any, speaker: string) => {
    const speakerSegments = documentData.speakers[speaker];
    const keywordCounts: Record<string, { count: number; category: string }> = {};

    speakerSegments.forEach((segment: any) => {
      segment.keywords.forEach((keyword: any) => {
        if (!keywordCounts[keyword.keyword]) {
          keywordCounts[keyword.keyword] = { count: 0, category: keyword.category };
        }
        keywordCounts[keyword.keyword].count++;
      });
    });

    return Object.entries(keywordCounts)
      .sort(([, a], [, b]) => b.count - a.count)
      .slice(0, 5); // Get top 5 keywords
  };

  return (
    <div className="p-4">
      {/* {Object.entries(filteredSegments).map(([documentId, documentData]) => (
        <div key={documentId} className="mb-6 border rounded-lg p-4">
          <h3 className="font-bold text-lg mb-2">{documentData.document.name}</h3>
          <div className="grid grid-cols-2 gap-4">
            {Object.keys(documentData.speakers).map(speaker => (
              <div key={speaker} className="bg-gray-100 p-2 rounded">
                <p className="font-semibold mb-2">{renamedSpeakers[speaker] || speaker}</p>
                <ul>
                  {getSpeakerKeywords(documentData, speaker).map(([keyword, { count, category }]) => (
                    <li key={keyword} className="text-sm">
                      <span className="font-medium">{keyword}</span> ({count}) - {category}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      ))} */}
    </div>
  );
};

export default SpeakerKeywords;

