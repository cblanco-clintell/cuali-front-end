import React from 'react';

interface EmotionDotsProps {
    positivePercentage: number;
    neutralPercentage: number;
    negativePercentage: number;
}

const EmotionDots: React.FC<EmotionDotsProps> = ({
    positivePercentage = 50,
    neutralPercentage = 30,
    negativePercentage = 20,
}) => {
    return (
        <div className="flex flex-col">
            <p className="inline text-xs">
                <span className="mr-2">
                    <span className="inline-block w-2 h-2 rounded-full bg-green-500 mr-2"></span>
                    {positivePercentage}% Positive
                </span>
            </p>
            <p className="inline text-xs">
                <span className="mr-2">
                    <span className="inline-block w-2 h-2 rounded-full bg-orange-500 mr-2"></span>
                    {neutralPercentage}% Neutral
                </span>
            </p>
            <p className="inline text-xs">
                <span>
                    <span className="inline-block w-2 h-2 rounded-full bg-red-500 mr-2"></span>
                    {negativePercentage}% Negative
                </span>
            </p>
        </div>
    );
};

export default EmotionDots;