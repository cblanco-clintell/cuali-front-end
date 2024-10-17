import React, { useState } from 'react';
import { useAppSelector } from '@/redux/hooks';
import { selectSelectedProject, getStudios } from '@/redux/features/projects/projectSelectors';
import StudioCardList from '@/components/configuration/StudioCardList';
import ProjectGeneralInfo from '@/components/configuration/ProjectGeneralInfo';
import StudioForm from '@/components/studios/StudioForm';
import Popup from '@/components/common/Popup';
import { StudioModel } from '@/types/studios';

const ProjectConfiguration: React.FC = () => {
  const studios = useAppSelector(getStudios);
  const selectedProject = useAppSelector(selectSelectedProject);
  const [showStudioForm, setShowStudioForm] = useState(false);
  const [editingStudio, setEditingStudio] = useState<StudioModel | null>(null);
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const [studioToDelete, setStudioToDelete] = useState<StudioModel | null>(null);

  const handleUpload = (studioId: number, file: File) => {
    console.log(`Uploading file ${file.name} to studio ${studioId}`);
  };

  const handleAddStudio = () => {
    setEditingStudio(null);
    setShowStudioForm(true);
  };

  const handleEditStudio = (studio: StudioModel) => {
    setEditingStudio(studio);
    setShowStudioForm(true);
  };

  const handleDeleteStudio = (studio: StudioModel) => {
    setStudioToDelete(studio);
    setShowDeleteConfirmation(true);
  };

  const handleConfirmDelete = () => {
    if (studioToDelete) {
      console.log(`Deleting studio: ${studioToDelete.name}, id: ${studioToDelete.id}`);
      // Here you would typically dispatch an action to delete the studio
      // For example: dispatch(deleteStudio(studioToDelete.id));
    }
    setShowDeleteConfirmation(false);
    setStudioToDelete(null);
  };

  const handleSubmitStudio = (name: string, language: string) => {
    if (editingStudio) {
      console.log(`Updating studio: ${name}, language: ${language}, id: ${editingStudio.id}`);
      // dispatch(updateStudio({ id: editingStudio.id, name, language }));
    } else if (selectedProject) {
      console.log(`Creating studio: ${name}, language: ${language}, for project: ${selectedProject.id}`);
      // dispatch(createStudio({ name, language, projectId: selectedProject.id }));
    }
    setShowStudioForm(false);
    setEditingStudio(null);
  };

  const handleClosePopup = () => {
    setShowStudioForm(false);
    setEditingStudio(null);
    setShowDeleteConfirmation(false);
    setStudioToDelete(null);
  };

  return (
    <div className="max-w-screen-2xl mx-auto mt-5">
      <h3 className="text-base font-semibold leading-7 text-gray-900">Study Configuration</h3>
      <p className="mt-1 max-w-2xl text-sm leading-6 text-gray-500">General information and objectives of the study.</p>
      <div className='grid grid-cols-3 gap-4'>
        <div className='col-span-2'>
          <ProjectGeneralInfo/>
        </div>
        <div className='col-span-1'>
          <StudioCardList 
            studios={studios || []} 
            onUpload={handleUpload} 
            onAddStudio={handleAddStudio}
            onEditStudio={handleEditStudio}
            onDeleteStudio={handleDeleteStudio}
          />
        </div>
      </div>
      {showStudioForm && (
        <Popup onClose={handleClosePopup}>
          <StudioForm onSubmit={handleSubmitStudio} studio={editingStudio || undefined} />
        </Popup>
      )}
      {showDeleteConfirmation && studioToDelete && (
        <Popup onClose={handleClosePopup}>
          <div className="p-4">
            <h3 className="text-lg font-semibold mb-2">Confirm Delete</h3>
            <p className="mb-4">Are you sure you want to delete the studio "{studioToDelete.name}"?</p>
            <div className="flex justify-end space-x-2">
              <button
                onClick={handleClosePopup}
                className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmDelete}
                className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
              >
                Delete
              </button>
            </div>
          </div>
        </Popup>
      )}
    </div>
  );
};

export default ProjectConfiguration;
