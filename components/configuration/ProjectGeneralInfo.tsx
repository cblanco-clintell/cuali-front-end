import React from 'react';
import { useAppSelector } from '@/redux/hooks';
import { selectSelectedProject } from '@/redux/features/projects/projectSelectors';

const ProjectGeneralInfo: React.FC = () => {
  const selectedProject = useAppSelector(selectSelectedProject);

  return (
    <div>
      <dl className="divide-y divide-gray-100">
        <div className="pb-6 pt-2 sm:grid sm:grid-cols-1 ">
          <dt className="text-sm font-medium leading-6 text-gray-900">Study name</dt>
          <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
            {selectedProject?.name || 'No study name available'}
          </dd>
        </div>
        <div className="py-6 sm:grid sm:grid-cols-1 sm:gap-4">
          <dt className="text-sm font-medium leading-6 text-gray-900">Study brief</dt>
          <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
            {selectedProject?.briefing || 'No briefing available'}
          </dd>
        </div>
        <div className="py-6 sm:grid sm:grid-cols-1 sm:gap-4">
          <dt className="text-sm font-medium leading-6 text-gray-900">Study Objectives</dt>
          <dd className="mt-2 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
            {selectedProject?.objectives && selectedProject.objectives.length > 0 ? (
              <ul className="divide-y divide-gray-100 rounded-md">
                {selectedProject.objectives.map((objective, index) => (
                  <li key={index} className="flex items-center py-4 text-sm leading-6">
                    <span className="text-gray-700">{index + 1}. {objective}</span>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-500">No objectives available for this project.</p>
            )}
          </dd>
        </div>
      </dl>
    </div>
  );
};

export default ProjectGeneralInfo;
