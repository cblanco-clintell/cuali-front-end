'use client';

import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'next/navigation';
import { SidebarLayout } from '@/components/common';
import Header from '@/components/header/Header';
import ProjectDetailNavbar from '@/components/projects/detail/ProjectDetailNavbar';
import { setSelectedProject } from '@/redux/features/projects/projectSlice';
import { selectSelectedProject } from '@/redux/features/projects/projectSelectors';
import { FiChevronLeft, FiFolder } from 'react-icons/fi';
// import ObjectiveSelector from '@/components/projects/objectives/ObjectiveSelector';

export default function ProjectLayout({ children }: { children: React.ReactNode }) {
  const dispatch = useDispatch();
  const { projectId } = useParams();

  const selectedProject = useSelector(selectSelectedProject);
  useEffect(() => {
    if (projectId) {
      dispatch(setSelectedProject(parseInt(projectId)));
    }
  }, [dispatch, projectId]);

  // Handle loading states
  if (!selectedProject) {
    return <div>Loading project data...</div>;
  }

  const breadcrumbs = [
    { icon: FiChevronLeft, title: 'Studies', href: '/projects' }, 
    { icon: FiFolder, title: selectedProject.name, href: `/projects/${projectId}` }
  ];

  return (
    <SidebarLayout>
      <div className="projects">
        <Header breadcrumbs={breadcrumbs} />
        <ProjectDetailNavbar projectId={projectId} />
        <div className=''>
          {/* <div className='max-w-[600px]'>
            <ObjectiveSelector />
          </div> */}
          {children}
        </div>
      </div>
    </SidebarLayout>
  );
}