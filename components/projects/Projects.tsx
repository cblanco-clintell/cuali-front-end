import React, { useState, useMemo } from 'react';
import ProjectCardList from '@/components/projects/ProjectCardList';
import ProjectTable from '@/components/projects/ProjectTable';
import { useAppSelector } from '@/redux/hooks';
import { selectProjects } from '@/redux/features/projects/projectSelectors';
import { useCreateProjectMutation } from '@/redux/features/projects/projectApiSlice';
import Header from '@/components/header/Header';
import ProjectForm from '@/components/projects/ProjectForm';
import Popup from '@/components/common/Popup';
import { FiPlus, FiGrid, FiList, FiArrowUp, FiArrowDown } from 'react-icons/fi';
import { ProjectModel } from '@/types/projects';

type SortField = 'name' | 'created';
type SortOrder = 'asc' | 'desc';

export const Projects = () => {
  const projects = useAppSelector(selectProjects);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [createProject] = useCreateProjectMutation();
  const [viewMode, setViewMode] = useState<'card' | 'table'>('card');
  const [sortField, setSortField] = useState<SortField>('created');
  const [sortOrder, setSortOrder] = useState<SortOrder>('desc');

  const handleAddProject = () => {
    setIsModalOpen(true);
  };

  const handleSubmitProject = async (name: string) => {
    try {
      await createProject({ name }).unwrap();
      setIsModalOpen(false);
    } catch (error) {
      console.error('Failed to create project:', error);
    }
  };

  const toggleViewMode = () => {
    setViewMode(viewMode === 'card' ? 'table' : 'card');
  };

  const toggleSortOrder = () => {
    setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
  };

  const sortedProjects = useMemo(() => {
    return [...projects].sort((a, b) => {
      if (sortField === 'name') {
        return sortOrder === 'asc' ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name);
      } else {
        return sortOrder === 'asc' 
          ? new Date(a.created).getTime() - new Date(b.created).getTime()
          : new Date(b.created).getTime() - new Date(a.created).getTime();
      }
    });
  }, [projects, sortField, sortOrder]);

  return (
    <div className="overflow-y-auto">
      <Header breadcrumbs={[{ title: 'Studies' }]} />

      <div className="max-w-screen-xl mx-auto">
        <div className="py-6 flex justify-between items-center">
          <h1 className="text-gray-900 text-3xl font-semibold leading-9">Studies</h1>
          <div className="flex gap-2">
            <div className="relative">
              <select
                value={sortField}
                onChange={(e) => setSortField(e.target.value as SortField)}
                className="appearance-none rounded-md bg-white pl-3 pr-8 py-1 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
              >
                <option value="name">Sort by Name</option>
                <option value="created">Sort by Date</option>
              </select>
            </div>
            <button
              onClick={toggleSortOrder}
              className="inline-flex items-center rounded-md bg-white px-2 py-1 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
            >
              {sortOrder === 'asc' ? <FiArrowUp className="w-4 h-4" /> : <FiArrowDown className="w-4 h-4" />}
            </button>
            <button
              onClick={toggleViewMode}
              className="inline-flex items-center rounded-md bg-white px-2 py-1 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
            >
              {viewMode === 'card' ? <FiList className="w-4 h-4" /> : <FiGrid className="w-4 h-4" />}
            </button>
            <button
              onClick={handleAddProject}
              className="inline-flex items-center rounded-md bg-white px-2 py-1 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
            >
              <FiPlus className="w-4 h-4 mr-1" />
              Add Project
            </button>
          </div>
        </div>
        
        {viewMode === 'card' ? (
          <ProjectCardList projects={sortedProjects} />
        ) : (
          <ProjectTable projects={sortedProjects} />
        )}

        {isModalOpen && (
          <Popup onClose={() => setIsModalOpen(false)}>
            <ProjectForm onSubmit={handleSubmitProject} />
          </Popup>
        )}
      </div>
    </div>
  );
};

export default Projects;
