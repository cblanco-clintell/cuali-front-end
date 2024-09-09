"use client";
import React from 'react';
import PageLayout from '@/components/placeholders/summary/PageLayout';
import Keywords from '@/components/placeholders/summary/Keywords';

export default function Page() {
  return (
    <PageLayout
      title="Keywords"
      content={<Keywords />}
    />
  );
}
