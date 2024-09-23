import React from "react";
import ProjectTableRow from "./ProjectTableRow";

interface ProjectTableProps {
  projects: any[];
}


const ProjectTable: React.FC<ProjectTableProps> = ({ projects }) => {
  return (
    <div className="grid gap-4">
      {projects?.map((project) => (
        <ProjectTableRow key={project.id} project={project} />
      ))}
    </div>
  );
};

export default ProjectTable;