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
import {
  useGetProjectQuery,
  useLazyGetProjectKeywordsQuery,
  useLazyGetProjectQuestionsQuery,
  useLazyGetProjectCategoriesQuery,
  useLazyGetProjectSegmentsQuery,
  useLazyGetProjectStudiosQuery,
} from '@/redux/features/projects/projectApiSlice';

export default function ProjectLayout({ children }: { children: React.ReactNode }) {
  const dispatch = useDispatch();
  const { projectId } = useParams();
  const [showChatBot, setShowChatBot] = useState(false);
  const selectedProject = useSelector(selectSelectedProject);
  const [isDataLoaded, setIsDataLoaded] = useState(false);

  const pathname = usePathname();
  const isAli = pathname.includes('ali');

  const { data: project, isLoading, isError } = useGetProjectQuery(projectId as string, {
    skip: !projectId || typeof projectId !== 'string',
  });

  // Lazy query hooks for fetching additional project details
  const [fetchKeywords] = useLazyGetProjectKeywordsQuery();
  const [fetchQuestions] = useLazyGetProjectQuestionsQuery();
  const [fetchCategories] = useLazyGetProjectCategoriesQuery();
  const [fetchSegments] = useLazyGetProjectSegmentsQuery();
  const [fetchStudios] = useLazyGetProjectStudiosQuery();
  useEffect(() => {
    if (projectId && typeof projectId === 'string') {
      dispatch(setSelectedProject(parseInt(projectId)));
    }
  }, [dispatch, projectId]);

  useEffect(() => {
    if (project) {
      Promise.all([
        fetchQuestions(project.id),
        fetchKeywords(project.id),
        fetchCategories(project.id),
        fetchSegments(project.id),
        fetchStudios(project.id)
      ]).then(() => setIsDataLoaded(true));
    }
  }, [project, fetchKeywords, fetchQuestions, fetchCategories, fetchSegments, fetchStudios]);

  if (isLoading || !isDataLoaded) {
    return <div>Loading project data...</div>;
  }

  if (isError) {
    return <div>Error loading project data. Please try again.</div>;
  }

  if (!selectedProject) {
    return <div>No project data available.</div>;
  }

  const toggleChatBot = () => {
    setShowChatBot((prevState) => !prevState);
  };

  const breadcrumbs = [
    { icon: FiChevronLeft, title: 'Studies', href: '/projects' },
    { icon: FiFolder, title: selectedProject.name, href: `/projects/${projectId}` },
  ];

  // Skip applying this layout to Ali pages
  if (isAli) return children;

  return (
    <SidebarLayout>
      <div className="projects h-screen flex flex-col">
        {/* Header and Navbar */}
        <div className="sticky top-0 z-10 bg-white">
          <Header breadcrumbs={breadcrumbs} />
          <ProjectDetailNavbar />
        </div>

        {/* Main Content Area */}
        <div className={`flex-1 grid ${showChatBot ? 'grid-cols-2' : 'grid-cols-1'} h-full`}>
          {/* Content Area */}
          <div className="overflow-y-auto px-5">
            <div>{children}</div>
          </div>

          {/* ChatBot */}
          {!isAli && showChatBot && (
            <div className="h-full border m-5 rounded-lg">
              <ChatBot />
            </div>
          )}
        </div>

        {/* ChatBot Toggle Button */}
        <button
          onClick={toggleChatBot}
          className="bg-white p-4 rounded fixed bottom-40 right-10 z-20 rounded-lg shadow"
        >
          <Image src="/ali.svg" alt="ChatBot" width={20} height={20} />
        </button>
      </div>
    </SidebarLayout>
  );
}
