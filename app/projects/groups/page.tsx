"use client";
import React from 'react';
import PageLayout from '@/components/placeholders/summary/PageLayout';
import Groups from '@/components/placeholders/summary/Groups';

export default function Page() {
  return (
    <PageLayout
      title="Groups"  // Passing the string for the title
      content={<Groups />}  // Passing the Groups component as content
    />
  );
}
