import React, { PureComponent } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LabelList } from 'recharts';

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
      <ResponsiveContainer width="100%" height={100}>
        <BarChart
          layout="vertical"
          width={500}
          height={100}
          data={data}
          margin={{
            top: 20,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis type="number" hide domain={[0, 100]} /> {/* Hide the axis and ensure it sums to 100% */}
          <YAxis type="category" dataKey="name" hide /> {/* We only have one category, so hide it */}
          <Tooltip formatter={(value) => `${value.toFixed(1)}%`} />
          {/* Positive bar */}
          <Bar dataKey="positive" stackId="a" fill="#82ca9d">
            <LabelList dataKey="positive" position="center" fill="white" formatter={(value) => `${value.toFixed(0)}%`} />
          </Bar>
          {/* Neutral bar */}
          <Bar dataKey="neutral" stackId="a" fill="#fdd835">
            <LabelList dataKey="neutral" position="center" fill="white" formatter={(value) => `${value.toFixed(0)}%`} />
          </Bar>
          {/* Negative bar */}
          <Bar dataKey="negative" stackId="a" fill="#f44336">
            <LabelList dataKey="negative" position="center" fill="white" formatter={(value) => `${value.toFixed(0)}%`} />
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    );
  }
}