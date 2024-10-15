import React, { useRef, useEffect, useState } from 'react';
import { Text } from '@visx/text';
import { scaleLog } from '@visx/scale';
import Wordcloud from '@visx/wordcloud/lib/Wordcloud';
import { Keyword } from '../types/keywords';

interface WordCloudProps {
  height: number;
  words: Keyword[];
}

// Define colors for each valence
const valenceColors = {
  positive: '#9AE17B',
  neutral: '#FFC55B',
  negative: '#E8704E',
};

const fontSizeSetter = (datum: Keyword) => datum.sentiment;

const fixedValueGenerator = () => 0.5;

type SpiralType = 'archimedean' | 'rectangular';

interface WordCloudWord extends Keyword {
  text: string;
  size: number;
}

const WordCloud: React.FC<WordCloudProps> = ({ height, words }) => {
  const [spiralType] = useState<SpiralType>('archimedean');
  const containerRef = useRef<HTMLDivElement>(null);
  const [containerWidth, setContainerWidth] = useState<number>(0);

  // Set font scale based on the provided words' sentiment values
  const fontScale = scaleLog({
    domain: [Math.min(...words.map((w) => w.sentiment)), Math.max(...words.map((w) => w.sentiment))],
    range: [10, 100],
  });

  useEffect(() => {
    if (containerRef.current) {
      const updateWidth = () => setContainerWidth(containerRef.current?.offsetWidth || 0);
      updateWidth();
      window.addEventListener('resize', updateWidth);
      return () => window.removeEventListener('resize', updateWidth);
    }
  }, []);

  const wordcloudWords: WordCloudWord[] = words.map(word => ({
    ...word,
    text: word.keyword,
    size: fontScale(word.sentiment)
  }));

  return (
    <div className="wordcloud" ref={containerRef}>
      {containerWidth > 0 && (
        <Wordcloud
          words={wordcloudWords}
          width={containerWidth}
          height={height}
          fontSize={(word) => word.size}
          font={'__DM_Sans_0dfae3'}
          padding={2}
          spiral={spiralType}
          rotate={0}
          random={fixedValueGenerator}
        >
          {(cloudWords) =>
            cloudWords.map((w, i) => (
              <Text
                key={`${w.text}-${i}`}
                fill={valenceColors[w.valence]}
                textAnchor={'middle'}
                transform={`translate(${w.x}, ${w.y}) rotate(${w.rotate})`}
                fontSize={w.size}
                fontFamily={w.font}
              >
                {w.text}
              </Text>
            ))
          }
        </Wordcloud>
      )}
      <style jsx>{`
        .wordcloud {
          display: flex;
          flex-direction: column;
          user-select: none;
          width: 100%;
          font-weight: 500;
        }
        .wordcloud svg {
          margin: 1rem 0;
          cursor: pointer;
        }
      `}</style>
    </div>
  );
};

export default WordCloud;