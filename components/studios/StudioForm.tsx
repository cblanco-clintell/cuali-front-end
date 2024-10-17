import React, { useState, useEffect } from 'react';
import { StudioModel } from '@/types/studios';

interface StudioFormProps {
  onSubmit: (name: string, language: string) => void;
  studio?: StudioModel;
}

const StudioForm: React.FC<StudioFormProps> = ({ onSubmit, studio }) => {
  const [name, setName] = useState('');
  const [language, setLanguage] = useState('english');

  useEffect(() => {
    if (studio) {
      setName(studio.name);
      setLanguage(studio.language || 'english');
    }
  }, [studio]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(name, language);
  };

  const isEditing = !!studio;

  return (
    <form onSubmit={handleSubmit}>
      <h3 className="text-base font-semibold leading-7 text-gray-900">
        {isEditing ? 'Edit studio' : 'Add new studio'}
      </h3>
      <p className="mt-1 max-w-2xl text-sm leading-6 text-gray-500">
        {isEditing ? 'Edit the studio details.' : 'Create a new studio for your study.'}
      </p>
      <div className="mb-4 mt-4">
        <label htmlFor="name" className="block text-sm font-medium text-gray-700">Studio Name</label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          required
        />
      </div>
      <div className="mb-4">
        <label htmlFor="language" className="block text-sm font-medium text-gray-700">Language</label>
        <select
          id="language"
          value={language}
          onChange={(e) => setLanguage(e.target.value)}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          disabled={isEditing}
        >
          <option value="english">English</option>
          <option value="spanish">Spanish</option>
        </select>
      </div>
      <div className="flex justify-end">
        <button
          type="submit"
          className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
        >
          {isEditing ? 'Update Studio' : 'Create Studio'}
        </button>
      </div>
    </form>
  );
};

export default StudioForm;
