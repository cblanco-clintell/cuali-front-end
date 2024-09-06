"use client";
import React from 'react';
import PageLayout from '@/components/placeholders/summary/PageLayout';
import Speakers from '@/components/placeholders/summary/Speakers';

export default function Page() {
  return (
    <PageLayout
      title="Speakers"  // Passing the string for the title
      content={<Speakers />}  // Passing the Groups component as content
    />
  );
}
