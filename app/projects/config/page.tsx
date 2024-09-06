"use client";
import React from 'react';
import PageLayout from '@/components/placeholders/summary/PageLayout';
import Config from '@/components/placeholders/summary/Config';

export default function Page() {
  return (
    <PageLayout
      title="Config"  // Passing the string for the title
      content={<Config />}  // Passing the Groups component as content
    />
  );
}
