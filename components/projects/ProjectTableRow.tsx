import React from 'react';
import { formatDate } from '@/utils/formatDate';
import { FiFolder } from "react-icons/fi";
import Link from 'next/link';
import { ProjectModel, ProjectStatus } from '@/types/projects';

interface ProjectTableRowProps {
  project: ProjectModel;
}

export const ProjectTableRow: React.FC<ProjectTableRowProps> = ({ project }) => {
  const url = project.status === ProjectStatus.DRAFT ? `/projects/${project.id}/configuration` : `/projects/${project.id}`;

  return (
    <Link href={url} className="block" key={project.id}>
      <div className="h-16 w-full">
        {/* Using grid with 4 columns */}
        <div className="grid grid-cols-[3fr_1fr_1fr_auto] h-16 px-3 py-2 bg-white rounded-lg hover:bg-gray-200 transition">
          
          {/* Icon + Project Name */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 pl-2.5 pr-2 py-2.5 bg-purple-light rounded-lg flex justify-center items-center">
              <FiFolder className="w-5 h-5 text-purple" />
            </div>
            <div className="flex flex-col justify-center">
              <div className="text-slate-700 text-base font-normal"> {project.name} </div>
              <div className="text-slate-700 text-xs font-normal"> Created {formatDate(project.created)} </div>
            </div>
          </div>

          {/* Groups Info */}
          <div className="flex flex-col justify-center items-start text-center">
            <div className="text-slate-700 text-sm font-medium"> {project.groupsCount} </div>
            <div className="text-slate-700 text-xs"> Groups </div>
          </div>

          {/* Project Status */}
          <div className="flex justify-center items-center">
            <div className="px-2 py-0.5 bg-emerald-50 rounded-2xl flex justify-center items-center">
              <div className="text-center text-emerald-700 text-xs font-medium">
                Available
              </div>
            </div>
          </div>

          {/* Ask Button */}
          <div className="flex justify-end items-center">
            <Link className="px-3.5 py-2 bg-white rounded-lg border border-gray-300 flex items-center gap-2" href={'/ali'}>
              <div className="text-slate-700 text-sm font-semibold"> Ask Ali </div>
            </Link>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ProjectTableRow;