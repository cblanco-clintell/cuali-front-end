"use client";
import React from 'react';
import { useGetProjectQuery } from '@/redux/features/projects/projectApiSlice';
import ProjectSummary from '@/components/projects/detail/summary/ProjectSummary';

export default function Page({ params }: { params: { projectId: string } }) {
  const { data: project, isLoading, isError } = useGetProjectQuery(params.projectId);

  if (isLoading) return <div>Loading project summary...</div>;
  if (isError) return <div>Error loading project summary...</div>;

  return (
    <div>
      <ProjectSummary/>
    </div>
  );
}