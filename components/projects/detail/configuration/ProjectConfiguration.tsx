import React, { useState, useRef, useEffect } from 'react';
import { useAppSelector } from '@/redux/hooks';
import { selectSelectedProject, getStudios } from '@/redux/features/projects/projectSelectors';
import StudioCardList from '@/components/configuration/StudioCardList';
import ProjectGeneralInfo from '@/components/configuration/ProjectGeneralInfo';
import StudioForm from '@/components/studios/StudioForm';
import Popup from '@/components/common/Popup';
import { StudioModel } from '@/types/studios';
import { useCreateStudioMutation, useUpdateStudioMutation } from '@/redux/features/studios/studioApiSlice';

const ProjectConfiguration: React.FC = () => {
  const studios = useAppSelector(getStudios);
  const selectedProject = useAppSelector(selectSelectedProject);
  const [showStudioForm, setShowStudioForm] = useState(false);
  const [editingStudio, setEditingStudio] = useState<StudioModel | null>(null);
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const [studioToDelete, setStudioToDelete] = useState<StudioModel | null>(null);

  const [createStudio] = useCreateStudioMutation();
  const [updateStudio] = useUpdateStudioMutation();

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

  const handleConfirmDelete = async() => {
    if (studioToDelete && selectedProject) {
      try {
        await updateStudio({
          projectId: selectedProject.id,
          studioId: studioToDelete.id,
          status: 'DELETED',
        }).unwrap();
        console.log(`Deleted studio: ${studioToDelete.name}, id: ${studioToDelete.id}`);
      } catch (error) {
        console.error('Failed to delete studio:', error);
      }
    }
    setShowDeleteConfirmation(false);
    setStudioToDelete(null);
  };

  const handleSubmitStudio = async (name: string, language: string) => {
    if (editingStudio && selectedProject) {
      try {
        await updateStudio({
          projectId: selectedProject.id,
          studioId: editingStudio.id,
          name,
          language,
        }).unwrap();
        console.log(`Updated studio: ${name}, language: ${language}, id: ${editingStudio.id}`);
      } catch (error) {
        console.error('Failed to update studio:', error);
      }
    } else if (selectedProject) {
      try {
        await createStudio({
          projectId: selectedProject.id,
          name,
          language,
        }).unwrap();
        console.log(`Created studio: ${name}, language: ${language}, for project: ${selectedProject.id}`);
      } catch (error) {
        console.error('Failed to create studio:', error);
      }
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

  const [leftColumnWidth, setLeftColumnWidth] = useState(66); // Initial width in percentage
  const dragRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (containerRef.current) {
      const containerRect = containerRef.current.getBoundingClientRect();
      const newWidth = ((e.clientX - containerRect.left) / containerRect.width) * 100;
      setLeftColumnWidth(Math.min(Math.max(newWidth, 30), 70)); // Limit between 30% and 70%
    }
  };

  const handleMouseUp = () => {
    document.removeEventListener('mousemove', handleMouseMove);
    document.removeEventListener('mouseup', handleMouseUp);
  };

  useEffect(() => {
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, []);

  return (
    <div className="max-w-screen-2xl mx-auto mt-5">
      <h3 className="text-base font-semibold leading-7 text-gray-900">Study Configuration</h3>
      <p className="mt-1 max-w-2xl text-sm leading-6 text-gray-500">General information and objectives of the study.</p>
      <div ref={containerRef} className="flex relative mt-4">
        <div style={{ width: `${leftColumnWidth}%` }} className="pr-4">
          <ProjectGeneralInfo />
        </div>
        <div
          ref={dragRef}
          className="w-1 bg-gray-200 cursor-col-resize absolute top-0 bottom-0"
          style={{ left: `${leftColumnWidth}%` }}
          onMouseDown={handleMouseDown}
        />
        <div style={{ width: `${100 - leftColumnWidth}%` }} className="pl-4">
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
            <p className="mb-4">Are you sure you want to delete the studio {studioToDelete.name}?</p>
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
