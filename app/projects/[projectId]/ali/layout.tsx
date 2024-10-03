'use client';

import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, usePathname } from 'next/navigation';
import { SidebarLayout } from '@/components/common';
import Header from '@/components/header/Header';
import ProjectDetailNavbar from '@/components/projects/detail/ProjectDetailNavbar';
import { setSelectedProject } from '@/redux/features/projects/projectSlice';
import { selectSelectedProject } from '@/redux/features/projects/projectSelectors';
import { FiChevronLeft, FiFolder } from 'react-icons/fi';
import ChatBot from '@/components/chatbot/ChatBot';
import Image from 'next/image';

export default function ProjectLayout({ children }: { children: React.ReactNode }) {
  const dispatch = useDispatch();
  const { projectId } = useParams();
  const selectedProject = useSelector(selectSelectedProject);

  useEffect(() => {
    if (projectId && typeof projectId === 'string') {
      dispatch(setSelectedProject(parseInt(projectId)));
    }
  }, [dispatch, projectId]);

  // Handle loading states
  if (!selectedProject) {
    return <div>Loading project data...</div>;
  }


  const breadcrumbs = [
    { icon: FiChevronLeft, title: 'Studies', href: '/projects' },
    { icon: FiFolder, title: selectedProject.name, href: `/projects/${projectId}` },
  ];

  return (
    <SidebarLayout>
      <div className="projects h-screen flex flex-col">
        <div className="sticky top-0 z-10 bg-white">
          <Header breadcrumbs={breadcrumbs} />
          <ProjectDetailNavbar />
        </div>
        <div className="">{children}</div>
      </div>
    </SidebarLayout>
  );
}