import React from 'react';

interface CardProps {
  title: string;
  children: React.ReactNode;
}

const Card: React.FC<CardProps> = ({ title, children }) => {
  return (
    <section className="flex flex-col gap-3 self-stretch p-3 bg-gray-50 rounded-lg border">
      <h2 className="font-semibold text-gray-900 text-sm">
        {title}
      </h2>
      {children}
    </section>
  );
};

export default Card;