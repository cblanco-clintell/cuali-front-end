import React from 'react';
import { formatDate } from '@/utils/formatDate';
import { FiFolder } from "react-icons/fi";
import Link from 'next/link';

interface ProjectTableRowProps {
  project: {
    id: number;
    created: string;
    name: string;
    status: string;
    groupsCount: number;
    groupsStatus: string;
    user: number;
  };
}

export const ProjectTableRow: React.FC<ProjectTableRowProps> = ({ project }) => {
  return (
    <div className="h-16 flex-col justify-start items-start gap-3 inline-flex">
      <div className="self-stretch h-16 px-3 py-2 bg-white rounded-lg flex justify-between items-center gap-3">
        {/* Icon + Project Name */}
        <div className="h-11 flex items-center gap-3">
          <div className="w-10 h-10 pl-2.5 pr-2 py-2.5 bg-indigo-100 rounded-lg flex justify-center items-center">
            <FiFolder className="w-5 h-5 text-indigo-500" />
          </div>
          <div className="grow shrink basis-0 flex-col justify-center items-start">
            <div className="text-slate-700 text-base font-normal"> {project.name} </div>
            <div className="text-slate-700 text-xs font-normal"> Created {formatDate(project.created)} </div>
          </div>
        </div>

        {/* Groups Info */}
        <div className="flex items-center gap-2">
          <div className="flex-col justify-center items-start text-center">
            <div className="text-slate-700 text-sm font-medium"> {project.groupsCount} </div>
            <div className="text-slate-700 text-xs"> Groups </div>
          </div>
        </div>

        {/* Project Status */}
        <div className="mix-blend-multiply flex">
          <div className="px-2 py-0.5 bg-orange-50 rounded-2xl flex justify-center items-center">
            <div className="text-center text-orange-700 text-xs font-medium">
              {project.groupsStatus}
            </div>
          </div>
        </div>

        {/* Ask Button */}
        <div className="rounded-lg flex">
          <Link className="px-3.5 py-2 bg-white rounded-lg shadow border border-gray-300 flex items-center gap-2" href={'/ali'}>
            <div className="text-slate-700 text-sm font-semibold"> Ask Ali </div>
          </Link>
        </div>

        {/* Optional placeholder */}
        <div className="w-6 h-6 relative" />
      </div>
    </div>
  );
};

export default ProjectTableRow;