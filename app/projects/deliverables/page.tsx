"use client";
import React from 'react';
import PageLayout from '@/components/placeholders/summary/PageLayout';
import Deliverables from '@/components/placeholders/summary/Deliverables';

export default function Page() {
  return (
    <PageLayout
      title="Deliverables"  // Passing the string for the title
      content={<Deliverables />}  // Passing the Groups component as content
    />
  );
}
