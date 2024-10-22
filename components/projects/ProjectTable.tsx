import React from "react";
import ProjectTableRow from "./ProjectTableRow";
import { ProjectModel } from "@/types/projects";

interface ProjectTableProps {
  projects: ProjectModel[];
}

const ProjectTable: React.FC<ProjectTableProps> = ({ projects }) => {
  return (
    <div className="space-y-4">
      {projects.map((project) => (
        <ProjectTableRow key={project.id} project={project} />
      ))}
    </div>
  );
};

export default ProjectTable;
