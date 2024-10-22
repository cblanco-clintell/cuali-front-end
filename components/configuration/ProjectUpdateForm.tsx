import React, { useState, useEffect } from 'react';
import { useAppSelector } from '@/redux/hooks';
import { selectSelectedProject } from '@/redux/features/projects/projectSelectors';
import { useUpdateProjectMutation } from '@/redux/features/projects/projectApiSlice';
import { ProjectStatus } from '@/types/projects';

const ProjectUpdateForm: React.FC = () => {
  const selectedProject = useAppSelector(selectSelectedProject);
  const [updateProject] = useUpdateProjectMutation();

  const [name, setName] = useState(selectedProject?.name || '');
  const [briefing, setBriefing] = useState(selectedProject?.briefing || '');
  const [objectives, setObjectives] = useState(selectedProject?.objectives?.join('\n') || '');

  useEffect(() => {
    if (selectedProject) {
      setName(selectedProject.name);
      setBriefing(selectedProject.briefing || '');
      setObjectives(selectedProject.objectives?.join('\n') || '');
    }
  }, [selectedProject]);

  const handleSubmit = async (e: React.FormEvent, status: ProjectStatus) => {
    e.preventDefault();
    const filteredObjectives = objectives.split('\n').filter(obj => obj.trim() !== '');
    const data: any = {
      id: selectedProject?.id,
      name,
      briefing,
      status,
    };

    if (filteredObjectives.length > 0) {
      data.objectives = filteredObjectives;
    }

    if (selectedProject) {
      try {
        await updateProject(data).unwrap();
        console.log(`Project updated with status: ${status}`);
      } catch (error) {
        console.error('Failed to update project:', error);
      }
    }
  };

  return (
    <form className="space-y-6">
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-gray-700">Study name</label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
        />
      </div>
      <div>
        <label htmlFor="briefing" className="block text-sm font-medium text-gray-700">Study brief</label>
        <textarea
          id="briefing"
          value={briefing}
          onChange={(e) => setBriefing(e.target.value)}
          rows={4}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
        />
      </div>
      <div>
        <label htmlFor="objectives" className="block text-sm font-medium text-gray-700">Study Objectives</label>
        <textarea
          id="objectives"
          value={objectives}
          onChange={(e) => setObjectives(e.target.value)}
          rows={6}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          placeholder="Enter each objective on a new line"
        />
      </div>
      <div className="flex justify-end space-x-2">
        <button
          type="button"
          onClick={(e) => handleSubmit(e, ProjectStatus.DRAFT)}
          className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300"
        >
          Save as Draft
        </button>
        <button
          type="button"
          onClick={(e) => handleSubmit(e, ProjectStatus.VALID)}
          className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
        >
          Publish
        </button>
      </div>
    </form>
  );
};

export default ProjectUpdateForm;
