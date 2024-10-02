import React, { PureComponent } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, LabelList } from 'recharts';

interface GeneralEmotionsProps {
  positive?: number;
  neutral?: number;
  negative?: number;
}

// Helper function to generate random sentiment values
const getRandomSentiments = () => {
  const positive = Math.random() * 100;
  const neutral = Math.random() * (100 - positive);
  const negative = 100 - positive - neutral;
  return { positive, neutral, negative };
};

export default class GeneralEmotionsBarChart extends PureComponent<GeneralEmotionsProps> {

  render() {
    const { positive, neutral, negative } = this.props;

    // If no values are provided, generate random sentiments
    const sentiments = positive !== undefined && neutral !== undefined && negative !== undefined
      ? { positive, neutral, negative }
      : getRandomSentiments();

    // Data for the stacked bar chart
    const data = [
      {
        name: 'Sentiments',
        positive: sentiments.positive,
        neutral: sentiments.neutral,
        negative: sentiments.negative,
      },
    ];

    return (
      <ResponsiveContainer width="100%" height={50}>
        <BarChart
          layout="vertical"
          width={500}
          height={60}
          data={data}
          margin={{
            top: 0,
            right: 30,
            left: 20,
            bottom: 0,
          }}
        >
          {/* Hide the axis and ensure it sums to 100% */}
          <XAxis type="number" hide domain={[0, 100]} />
          {/* We only have one category, so hide it */}
          <YAxis type="category" dataKey="name" hide />
          <Tooltip formatter={(value) => `${value.toFixed(1)}%`} />
          
          {/* Positive bar with rounded corners */}
          <Bar dataKey="positive" stackId="a" fill="#82ca9d" radius={[20, 0, 0, 20]}>
            <LabelList dataKey="positive" position="center" fill="white" formatter={(value) => `${value.toFixed(0)}%`} />
          </Bar>
          {/* Neutral bar */}
          <Bar dataKey="neutral" stackId="a" fill="#fdd835">
            <LabelList dataKey="neutral" position="center" fill="white" formatter={(value) => `${value.toFixed(0)}%`} />
          </Bar>
          {/* Negative bar with rounded corners */}
          <Bar dataKey="negative" stackId="a" fill="#f44336" radius={[0, 20, 20, 0]}>
            <LabelList dataKey="negative" position="center" fill="white" formatter={(value) => `${value.toFixed(0)}%`} />
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    );
  }
}