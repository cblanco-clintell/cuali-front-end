import React, { useState, useEffect } from 'react';
import { useAppSelector } from '@/redux/hooks';
import { selectSelectedProject } from '@/redux/features/projects/projectSelectors';
import { useUpdateProjectMutation } from '@/redux/features/projects/projectApiSlice';
import { ProjectStatus } from '@/types/projects';
import { FiPlus, FiTrash2 } from 'react-icons/fi';

const ProjectUpdateForm: React.FC = () => {
  const selectedProject = useAppSelector(selectSelectedProject);
  const [updateProject] = useUpdateProjectMutation();

  const [name, setName] = useState(selectedProject?.name || '');
  const [briefing, setBriefing] = useState(selectedProject?.briefing || '');
  const [objectives, setObjectives] = useState<string[]>(selectedProject?.objectives || ['']);

  useEffect(() => {
    if (selectedProject) {
      setName(selectedProject.name);
      setBriefing(selectedProject.briefing || '');
      setObjectives(selectedProject.objectives || ['']);
    }
  }, [selectedProject]);

  const handleObjectiveChange = (index: number, value: string) => {
    const newObjectives = [...objectives];
    newObjectives[index] = value;
    setObjectives(newObjectives);
  };

  const addObjective = () => {
    setObjectives([...objectives, '']);
  };

  const removeObjective = (index: number) => {
    const newObjectives = objectives.filter((_, i) => i !== index);
    setObjectives(newObjectives);
  };

  const handleSubmit = async (e: React.FormEvent, status: ProjectStatus) => {
    e.preventDefault();
    const filteredObjectives = objectives.filter(obj => obj.trim() !== '');
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
        <label className="block text-sm font-medium text-gray-700">Study Objectives</label>
        {objectives.map((objective, index) => (
          <div key={index} className="flex items-center space-x-2 mt-2">
            <input
              type="text"
              value={objective}
              onChange={(e) => handleObjectiveChange(index, e.target.value)}
              className="flex-grow rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              placeholder={`Objective ${index + 1}`}
            />
            <button
              type="button"
              onClick={() => removeObjective(index)}
              className="p-2 text-red-500 hover:text-red-700"
            >
              <FiTrash2 />
            </button>
          </div>
        ))}
        <button
          type="button"
          onClick={addObjective}
          className="mt-2 inline-flex items-center px-3 py-1 border border-transparent text-sm leading-4 font-medium rounded-md text-indigo-700 bg-indigo-100 hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          <FiPlus className="mr-2" /> Add Objective
        </button>
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
