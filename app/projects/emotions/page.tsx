"use client";
import React from 'react';
import PageLayout from '@/components/placeholders/summary/PageLayout';
import Emotions from '@/components/placeholders/summary/Emotions';

export default function Page() {
  return (
    <PageLayout
      title="Emotions"  // Passing the string for the title
      content={<Emotions />}  // Passing the Groups component as content
    />
  );
}
