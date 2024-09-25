import React from 'react';
import { formatDate } from '@/utils/formatDate';
import { FiFolder } from "react-icons/fi";
import Link from 'next/link';

interface ProjectCardProps {
  project: {
    id: number;
    created: string;
    name: string;
    status: string;
    briefing: string | null;
    objectives: string[] | null;
    user: number;
  };
}

export const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
  return (
    <Link href={`/projects/${project.id}`} className="block" key={project.id}>
    <article className="flex flex-col px-3 p-4 bg-white rounded-lg shadow-md">
      {/* Project Header */}
      <header className="">
        <div className="w-10 h-10 px-2.5 py-2.5 bg-purple-light rounded-lg">
            <FiFolder className="w-5 h-5 text-purple" />
        </div>
      </header>

      {/* Project Body */}
      <div className='mt-3'>
        <h2 className="text-lg font-semibold">{project?.name}</h2>
        <time dateTime={project?.created} className="text-xs text-gray-500">
                Creado el {formatDate(project?.created)}
        </time>
      </div>
      

      {/* Project Footer */}
      <footer className="flex gap-10 justify-between items-start mt-3 w-full">
        <div className="text-xs text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-2xl">
          Available
        </div>
      </footer>
    </article>
    </Link>
  );
};