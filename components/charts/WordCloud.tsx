import React, { useRef, useEffect, useState } from 'react';
import { Text } from '@visx/text';
import { scaleLog } from '@visx/scale';
import Wordcloud from '@visx/wordcloud/lib/Wordcloud';

interface WordData {
  text: string;
  value: number;
  sentiment: 'positive' | 'neutral' | 'negative'; // Use sentiment key
}

interface WordCloudProps {
  height: number;
  words: WordData[];
}

// Define colors for each sentiment
const sentimentColors = {
  positive: '#9AE17B',
  neutral: '#FFC55B',
  negative: '#E8704E',
};

const fontSizeSetter = (datum: WordData, scale: any) => scale(datum.value);

const fixedValueGenerator = () => 0.5;

type SpiralType = 'archimedean' | 'rectangular';

const WordCloud: React.FC<WordCloudProps> = ({ height, words }) => {
  const [spiralType, setSpiralType] = React.useState<SpiralType>('archimedean');
  const containerRef = useRef<HTMLDivElement>(null);
  const [containerWidth, setContainerWidth] = useState<number>(0);

  // Set font scale based on the provided words' values
  const fontScale = scaleLog({
    domain: [Math.min(...words.map((w) => w.value)), Math.max(...words.map((w) => w.value))],
    range: [5, 50],
  });

  useEffect(() => {
    if (containerRef.current) {
      const updateWidth = () => setContainerWidth(containerRef.current?.offsetWidth || 0);
      updateWidth();
      window.addEventListener('resize', updateWidth);
      return () => window.removeEventListener('resize', updateWidth);
    }
  }, []);

  return (
    <div className="wordcloud" ref={containerRef}>
      {containerWidth > 0 && (
        <Wordcloud
          words={words}
          width={containerWidth}
          height={height}
          fontSize={(word) => fontSizeSetter(word, fontScale)}
          font={'__DM_Sans_0dfae3'}
          padding={2}
          spiral={spiralType}
          rotate={0}
          random={fixedValueGenerator}
        >
          {(cloudWords) =>
            cloudWords.map((w) => (
              <Text
                key={w.text}
                fill={sentimentColors[w.sentiment]} // Map sentiment to color
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
