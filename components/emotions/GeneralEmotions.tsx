import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, LabelList } from 'recharts';
import { useAppSelector } from '@/redux/hooks';
import { selectGeneralEmotions } from '@/redux/features/projects/projectSelectors';

interface GeneralEmotionsProps {}

const GeneralEmotionsBarChart: React.FC<GeneralEmotionsProps> = () => {
  const generalEmotions = useAppSelector(selectGeneralEmotions);

  return (
    <ResponsiveContainer width="100%" height={50}>
      <BarChart
        layout="vertical"
        width={500}
        height={60}
        data={generalEmotions}
        margin={{
          top: 0,
          right: 30,
          left: 20,
          bottom: 0,
        }}
      >
        <XAxis type="number" hide domain={[0, 100]} />
        <YAxis type="category" dataKey="name" hide />
        
        <Tooltip 
          formatter={(value: number, name: string, props: any) => {
            const count = props.payload[name.replace('Percentage', '')];
            return [`${count}`, name.replace('Percentage', '')].map(item => item.charAt(0).toUpperCase() + item.slice(1));
          }}
        />
        
        {/* Positive bar with rounded corners */}
        <Bar dataKey="positivePercentage" stackId="a" fill="#82ca9d" radius={[20, 0, 0, 20]}>
          <LabelList dataKey="positivePercentage" position="center" fill="white" formatter={(value: number) => `${value.toFixed(0)}%`} />
        </Bar>

        {/* Neutral bar */}
        <Bar dataKey="neutralPercentage" stackId="a" fill="#fdd835">
          <LabelList dataKey="neutralPercentage" position="center" fill="white" formatter={(value: number) => `${value.toFixed(0)}%`} />
        </Bar>

        {/* Negative bar with rounded corners */}
        <Bar dataKey="negativePercentage" stackId="a" fill="#f44336" radius={[0, 20, 20, 0]}>
          <LabelList dataKey="negativePercentage" position="center" fill="white" formatter={(value: number) => `${value.toFixed(0)}%`} />
        </Bar>
        
      </BarChart>
    </ResponsiveContainer>
  );
};

export default GeneralEmotionsBarChart;
