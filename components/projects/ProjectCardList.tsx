import React from 'react';
import { ProjectCard } from './ProjectCard';
import { ProjectModel } from '@/types/projects'; // Adjust the import path as needed

interface ProjectCardListProps {
  projects: ProjectModel[];
}

const ProjectCardList: React.FC<ProjectCardListProps> = ({ projects }) => {
  return (
    <div className="space-y-4 p-4">
      <div className="grid grid-cols-[repeat(auto-fit,minmax(400px,1fr))] gap-4">
        {projects.map((project) => (
          <ProjectCard 
            key={project.id} 
            project={project}
          />
        ))}
      </div>
    </div>
  );
};

export default ProjectCardList;
