import React, { useRef, useEffect, useState } from 'react';
import { Text } from '@visx/text';
import { scaleLog } from '@visx/scale';
import Wordcloud from '@visx/wordcloud/lib/Wordcloud';
import { GrammarToken } from '@/types/grammar';

interface GrammarWordCloudProps {
  height: number;
  tokens: GrammarToken[];
  category: string;
  showSpanish: boolean;
}

const categoryColors = {
  noun: '#9AE17B',
  adj: '#FFC55B',
  verb: '#E8704E',
  other: '#7B9AE1',
};

const fontSizeSetter = (datum: GrammarToken) => datum.count;

const fixedValueGenerator = () => 0.5;

type SpiralType = 'archimedean' | 'rectangular';

interface WordCloudWord extends GrammarToken {
  text: string;
  size: number;
}

const GrammarWordCloud: React.FC<GrammarWordCloudProps> = ({ height, tokens, category, showSpanish }) => {
  const [spiralType] = useState<SpiralType>('archimedean');
  const containerRef = useRef<HTMLDivElement>(null);
  const [containerWidth, setContainerWidth] = useState<number>(0);

  const fontScale = scaleLog({
    domain: [Math.min(...tokens.map((t) => t.count)), Math.max(...tokens.map((t) => t.count))],
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

  const wordcloudWords: WordCloudWord[] = tokens.map(token => ({
    ...token,
    text: showSpanish ? token.translation : token.token,
    size: fontScale(token.count)
  }));

  return (
    <div className="grammar-wordcloud" ref={containerRef}>
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
                fill={categoryColors[category as keyof typeof categoryColors]}
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
    </div>
  );
};

export default GrammarWordCloud;
