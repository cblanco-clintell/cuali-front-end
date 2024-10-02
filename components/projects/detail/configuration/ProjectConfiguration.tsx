import React from 'react';
import { useAppSelector } from '@/redux/hooks';
import { selectSelectedProject } from '@/redux/features/projects/projectSelectors';

const ProjectConfiguration: React.FC = () => {
  const selectedProject = useAppSelector(selectSelectedProject);

  return (
    <div className="flex flex-col gap-4 p-6 rounded-xl shadow-sm bg-neutral-50 border-zinc-300 mx-auto max-w-screen-lg">
      {/* Header */}
      <div className="flex flex-wrap gap-3 items-center w-full">
        <div className="font-semibold text-gray-900 text-sm">Study Configuration</div>
      </div>

      {/* Study General Info */}
      <div className="flex flex-col py-3 mt-2 w-full">
        {/* Study Name */}
        <div className="flex flex-col mt-3 w-full">
          <div className="flex flex-wrap gap-3 items-start w-full">
            <div className="flex flex-col min-w-[240px] text-zinc-800 w-[411px]">
              <div className="font-semibold text-gray-900 text-sm">Study name</div>
              <div className="px-3 py-2 mt-2 w-full text-sm bg-white rounded-lg border border-solid border-zinc-400">
                {selectedProject?.name || 'No study name available'}
              </div>
            </div>
            <div className="flex justify-center items-center absolute bottom-1.5 right-[337px]">
              <img
                src="/path/to/icon.png"
                alt="edit icon"
                className="w-5 h-5 object-contain"
              />
            </div>
          </div>

          {/* Study Brief */}
          <div className="flex flex-col mt-3">
            <div className="font-semibold text-gray-900 text-sm">Study brief</div>
            <div className="flex-1 shrink p-3 mt-2.5 w-full text-sm leading-5 bg-gray-50 rounded-lg border border-solid border-zinc-400 text-neutral-500">
              {selectedProject?.briefing || 'No briefing available'}
            </div>
          </div>

          {/* Objectives */}
          <div className="flex flex-col mt-5">
            <div className="font-semibold text-gray-900 text-sm">Study Objectives</div>
            <p className="mt-3 text-sm text-zinc-800">
              These are the main objectives of your study, where cuali.ai will offer you a more amplified view of these points.
            </p>

            {/* Objectives List */}
            <div className="gap-3 mt-3">
              {selectedProject?.objectives?.map((objective, index) => (
                <div key={index} className="flex flex-col flex-1 min-w-[240px] mt-4">
                  <div className="font-semibold text-gray-900 text-xs">Objective {index + 1}</div>
                  <div className="px-3 py-2 mt-2 w-full bg-gray-50 rounded-lg border border-solid border-zinc-300 text-neutral-500">
                    {objective}
                  </div>
                </div>
              )) || (
                <p className="text-neutral-500">No objectives available for this project.</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectConfiguration;