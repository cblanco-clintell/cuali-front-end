import React from 'react';
import ProjectCardList from '@/components/projects/ProjectCardList';
import { useSelector } from 'react-redux';
import { selectProjects } from '@/redux/features/projects/projectSelectors'; // Import your selector
import Header from '@/components/header/Header';

export const Projects = () => {
  // Get projects from the Redux store using the selector
  const projects = useSelector(selectProjects);

  return (
    <div className="overflow-y-auto">
      <Header breadcrumbs={[{ title: 'Studies' }]} />

      <div className="max-w-screen-xl mx-auto">
        <div className="py-6">
          <h1 className="text-gray-900 text-3xl font-semibold leading-9">Studies</h1>
        </div>
        
        {/* Pass the projects to ProjectCardList */}
        <ProjectCardList projects={projects} />
      </div>
    </div>
  );
};

export default Projects;