import React from 'react';

interface CardProps {
  title: string;
  children: React.ReactNode;
  className?: string; // Add className to the props
}

const Card: React.FC<CardProps> = ({ title, children, className }) => {
  return (
    <section className={`flex flex-col gap-3 self-stretch p-3 bg-gray-50 rounded-lg border ${className}`}>
      <h2 className="font-semibold text-gray-900 text-sm">
        {title}
      </h2>
      {children}
    </section>
  );
};

export default Card;