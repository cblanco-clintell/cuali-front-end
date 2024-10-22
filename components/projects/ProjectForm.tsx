import React, { useState } from 'react';

interface ProjectFormProps {
  onSubmit: (name: string) => void;
}

const ProjectForm: React.FC<ProjectFormProps> = ({ onSubmit }) => {
  const [name, setName] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(name);
  };

  return (
    <form onSubmit={handleSubmit}>
      <h3 className="text-base font-semibold leading-7 text-gray-900">
        Add new project
      </h3>
      <p className="mt-1 max-w-2xl text-sm leading-6 text-gray-500">
        Create a new project for your study.
      </p>
      <div className="mb-4 mt-4">
        <label htmlFor="name" className="block text-sm font-medium text-gray-700">Project Name</label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          required
        />
      </div>
      <div className="flex justify-end">
        <button
          type="submit"
          className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
        >
          Create Project
        </button>
      </div>
    </form>
  );
};

export default ProjectForm;