import React from 'react';


interface Emotion {
  name: string;
  intensity: number; // Intensity in percentage
  sentiment: 'positive' | 'neutral' | 'negative';
}

interface EmotionPillsProps {
  emotions: Emotion[];
}

const getSentimentColor = (sentiment: 'positive' | 'neutral' | 'negative') => {
  switch (sentiment) {
    case 'positive':
      return 'bg-lime-300'; // Positive emotions in lime color
    case 'neutral':
      return 'bg-amber-300'; // Neutral emotions in amber color
    case 'negative':
      return 'bg-red-300'; // Negative emotions in red color
    default:
      return 'bg-gray-300';
  }
};

const EmotionPills: React.FC<EmotionPillsProps> = ({ emotions }) => {
  return (
      <div className="self-stretch justify-start items-center inline-flex flex-wrap gap-2">
        {emotions.map((emotion, index) => (
          <div key={index} className="px-3 py-2 rounded-lg border border-zinc-300 justify-start items-center gap-2 flex">
            <div className="rounded-lg justify-center items-center gap-2 flex">
              <div className="text-slate-700 text-xs font-medium font-['DM Sans'] leading-none">{emotion.text}</div>
            </div>
            <div className="justify-start items-center gap-1 flex">
              <div className={`w-2 h-2 ${getSentimentColor(emotion.sentiment)} rounded-full`} />
              <div className="text-neutral-500 text-xs font-medium font-['DM Sans'] leading-none">{emotion.value}%</div>
            </div>
          </div>
        ))}
      </div>
  );
};

export default EmotionPills;